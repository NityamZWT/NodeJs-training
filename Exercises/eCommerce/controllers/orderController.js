const { where, Op } = require('sequelize');
const { Cart, Product, Order, Order_item } = require('../models');
const { responseHandler, handleYupError } = require('../utilities/customHandler');
const { orderStatusSchema } = require('../validators/orderValidator')
const yup = require('yup');

//handling order creation
const createOrder = async (req, res, next) => {
    try {
        const user_id = parseInt(req.user.id);
        console.log("user_id", user_id);

        const cartData = await Cart.findAll({
            where: { user_id: user_id },
            include: {
                model: Product,
                required: false,
                as: "product"
            }
        });

        if (!cartData.length) return responseHandler(res, 400, false, "Cart not found!");

        //handling total amount calculation
        const TotalAmount = (cartData) => {
            let total_price = 0;
            cartData.forEach((data) => {
                total_price += parseInt(data.quantity) * parseFloat(data.product.price);
            });
            return total_price;
        };
        // check if stock is less than quantity
        for (const data of cartData) {
            if (data.product.stock < data.quantity) {
                return responseHandler(res, 400, true, `Desire quantity of ${data.product.name} is not available`)
            }
        }
        //create order
        const orderData = await Order.create({
            user_id,
            total_price: parseFloat(TotalAmount(cartData))
        });

        if (!orderData) return responseHandler(res, 500, false, "Order is not created due to server error!");

        const order_id = orderData.id;

        let newOrderItem = [];
        for (const data of cartData) {
            newOrderItem.push({
                order_id,
                product_id: data.product_id,
                quantity: data.quantity,
                price: data.product.price
            });
        }
        // bulk create order item
        const orderItemData = await Order_item.bulkCreate(newOrderItem);
        if (!orderItemData) return responseHandler(res, 500, false, "Order items are not created due to server error!");

        for (const data of cartData) {
            await Product.update(
                { stock: data.product.stock - data.quantity },
                { where: { id: data.product_id } }
            );
        }
        //delete cart once order is placed
        await Cart.destroy({ where: { user_id } });

        return responseHandler(res, 201, true, "Order and order items are created!", [orderData]);

    } catch (error) {
        next(error);
    }
};

//handling getting of orders
const getOrders = async (req, res, next) => {
    try {
        const user_id = parseInt(req.user.id)
        const orderHistory = await Order.findAll({
            where: {
                user_id
            },
            include: {
                model: Order_item,
                require: false,
                as: "oder_item",
                include: {
                    model: Product,
                    require: false,
                    as: "product"
                }
            }
        })
        if (!orderHistory.length) return responseHandler(res, 404, false, "orders not found!");

        return responseHandler(res, 200, true, 'All Orders are fetched successfully', orderHistory)
    } catch (error) {
        next(error)
    }
}

//handling getting of specific order
const getOrderById = async (req, res, next) => {
    try {
        const order_id = parseInt(req.params.id);
        const user_id = parseInt(req.user.id);

        const orderData = await Order.findOne({
            where: {
                user_id,
                id: order_id
            },
            include: {
                model: Order_item,
                require: false,
                as: "oder_item",
                include: {
                    model: Product,
                    require: false,
                    as: "product"
                }
            }
        })
        if (orderData === null) return responseHandler(res, 404, false, "orders not found!");

        return responseHandler(res, 200, true, ' Orders details fetched successfully', orderData)
    } catch (error) {
        next(error)
    }
}

//handling updating of order status only by admin
const updateOrderStatus = async (req, res, next) => {
    try {
        await orderStatusSchema.validate(req.body, { abortEarly: false });
        const order_id = parseInt(req.params.id);
        const { status } = req.body;
        const updateStatus = await Order.update({ status },
            {
                where: {
                    id: order_id
                }
            }
        )
        console.log("orderstatus--",updateStatus);
        
        if (!updateStatus || updateStatus[0] === 0) {
            return responseHandler(res, 404, false, 'Order not found!');
        }
        const updatedOrder = await Order.findOne({
            where: {
                id: order_id
            }, include: {
                model: Order_item,
                require: false,
                as: "oder_item",
                include: {
                    model: Product,
                    require: false,
                    as: "product"
                }
            }
        })
        return responseHandler(res, 200, true, 'status updated successfully!', [updatedOrder])
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error)
    }
}

const getAllOrders = async(req, res, next)=>{
    try {
        console.log('inside');
        
        const orderHistory = await Order.findAll({
            where:{
                status:"pending"
            },
            include: [{
                model: Order_item,
                require: false,
                as: "oder_item",
                include: {
                    model: Product,
                    require: false,
                    as: "product"
                }
            }]
        })
        if (!orderHistory.length) return responseHandler(res, 404, false, "orders not found!");
        console.log(orderHistory);
        
        return responseHandler(res, 200, true, 'All Orders are fetched successfully', orderHistory)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    getAllOrders
}