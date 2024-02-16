<template>
    <div class="cart">
        <h2 class="mb-5">Your Cart</h2>
        <p class="mb-5">Total Price: {{ calculateTotalPrice() }} €</p>
        <ul class="list_cart mb-5">
            <li class="list_cart_item" v-for="cartItem in userCart" :key="cartItem.id">
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                    <img class="list_cart_item_img rounded-t-lg" :src="cartItem.image" alt="Product Image" />
                    <div class="p-5">
                        <h3 class="list_cart_item_name mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ cartItem.name }}</h3>
                        <p class="mb-3 font-normal text-gray-700">Price: {{ cartItem.price }} €</p>
                        <p class="mb-3 font-normal text-gray-700">Quantity: {{ cartItem.quantity }}</p>
                        <button class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="removeFromCart(cartItem.id)">Supprimer</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { doc, getFirestore, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { app } from '~/firebase.config.js';

const db = getFirestore(app);
const userCart = ref([]);
const user = JSON.parse(localStorage.getItem('user'));

onMounted(() => {
    fetchCartProduct();
});

const fetchCartProduct = async () => {
    if (user) {
        const cartQuery = query(collection(db, 'cart'), where('uid', '==', user.uid));
        const cartSnapshot = await getDocs(cartQuery);

        userCart.value = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
};

const removeFromCart = async (productId) => {
    const productRef = doc(collection(db, 'cart'), productId);

    try {
        await deleteDoc(productRef);
        console.log('Product removed from cart successfully.');
        fetchCartProduct(); 
    } catch (error) {
        console.error('Error removing product from cart:', error);
    }
};

const calculateTotalPrice = () => {
    return userCart.value.reduce((total, cartItem) => {
        return total + (cartItem.price * cartItem.quantity);
    }, 0).toFixed(2);
};
</script>

<style scoped>
    .list_cart{
        display: flex;
        align-items:center;
        justify-content: flex-start;
        flex-wrap: wrap;
        column-gap: 12px;
        row-gap: 12px;
        width: 100%;
    }

    .list_cart .list_cart_item{
        width: calc(100% / 6 - 10px);
    }

    .list_cart .list_cart_item .list_cart_item_img{
        width: 100%;
        height:250px;
        object-fit: cover;
    }

    .list_cart .list_cart_item .list_cart_item_name{
        text-transform: capitalize;
        font-size:16px;
    }
</style>
