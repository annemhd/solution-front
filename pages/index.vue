<template>
    <div class="product_page">
        <div class="flex justify-between items-center w-full">
            <h1 class="mb-5 mt-5 text-5xl">Boutique</h1>
            <el-button v-if="loggedAndAdmin" plain @click="dialogVisible = true">
                Ajouter un article
            </el-button>
        </div>

        <el-dialog v-model="dialogVisible" title="Ajouter un article" width="500">
            <el-form class="form">
                <el-col :span="24">
                    <el-form-item>
                        <el-input
                            type="text"
                            id="image"
                            placeholder="Image"
                            v-model="newProduct.image"
                            required
                        />
                    </el-form-item>
                </el-col>

                <el-form-item>
                    <el-input
                        type="number"
                        id="price"
                        placeholder="Prix"
                        v-model="newProduct.price"
                        required
                        step="0.01"
                        onkeydown="return event.keyCode == 69 ? false : true"
                    />
                </el-form-item>
                <el-form-item>
                    <el-input
                        type="text"
                        id="name"
                        placeholder="Nom du produit"
                        v-model="newProduct.name"
                        required
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer flex justify-center">
                    <el-button @click="dialogVisible = false">Annuler</el-button>
                    <el-button type="primary" @click.prevent="submitForm()"> Ajouter </el-button>
                </div>
            </template>
        </el-dialog>

        <ul class="product_list mb-5">
            <li class="product_list_item" v-for="product in products" :key="product.id">
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                    <img
                        class="product_list_item_img rounded-t-lg"
                        :src="product.image"
                        alt="Product Image"
                    />
                    <div class="p-5">
                        <h3
                            class="product_list_item_name mb-2 text-2xl font-bold tracking-tight text-gray-900"
                        >
                            {{ product.name }}
                        </h3>
                        <p class="mb-3 font-normal text-gray-700">{{ product.price }} €</p>
                        <button
                            type="button"
                            class="product_list_item_button_add text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                            @click="addToCart(product)"
                        >
                            Add to cart
                        </button>
                        <button
                            type="button"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            @click="deleteProduct(product.id)"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            @click="openEditPopup(product)"
                        >
                            Modifier
                        </button>
                    </div>
                </div>
            </li>
        </ul>

        <div class="modal" v-if="isEditingPopupOpen">
            <h2 class="mb-5">Edit Product</h2>
            <form class="modal_content max-w-sm mx-auto border-gray-200 rounded-lg shadow p-5">
                <div class="mb-5">
                    <label for="image" class="block mb-2 text-sm font-medium text-gray-900"
                        >Image</label
                    >
                    <input
                        type="text"
                        id="image"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="image"
                        v-model="editingProduct.image"
                        required
                    />
                </div>
                <div class="mb-5">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900"
                        >Price</label
                    >
                    <input
                        type="number"
                        id="price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Price"
                        v-model="editingProduct.price"
                        required
                        step="0.01"
                        onkeydown="return event.keyCode == 69 ? false : true"
                    />
                </div>
                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
                        >Name</label
                    >
                    <input
                        type="text"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Name"
                        v-model="editingProduct.name"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center me-2"
                    @click.prevent="updateProduct()"
                >
                    Update product
                </button>
                <button
                    type="button"
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    @click.prevent="closeEditPopup()"
                >
                    Cancel
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import {
    addDoc,
    collection,
    updateDoc,
    deleteDoc,
    getDoc,
    setDoc,
    doc,
    getDocs,
    getFirestore,
} from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { app } from '~/firebase.config.js'

const TOKEN = localStorage.getItem('TOKEN')
const user = localStorage.getItem('user')

const loggedAndAdmin = computed(() => {
    return TOKEN ?? false
})

const db = getFirestore(app)
const products = ref([])
const newProduct = ref({ name: '', price: 0, image: '' })
const editingProduct = ref(null)
const isEditingPopupOpen = ref(false)
const cartCollection = collection(getFirestore(app), 'cart')
const dialogVisible = ref(false)

const fetchProducts = async () => {
    const productsCollection = collection(db, 'products')
    const querySnapshot = await getDocs(productsCollection)

    products.value = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        }
    })

    // console.log('Products:', products.value)
}

const addToCart = async (product) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            const cartItemRef = doc(cartCollection, user.uid + product.id)

            const cartItemDoc = await getDoc(cartItemRef)

            if (cartItemDoc.exists()) {
                const currentQuantity = cartItemDoc.data().quantity || 0
                await updateDoc(cartItemRef, { quantity: currentQuantity + 1 })
            } else {
                await setDoc(cartItemRef, {
                    image: product.image,
                    price: product.price,
                    name: product.name,
                    uid: user.uid,
                    quantity: 1,
                })
            }
            console.log('Product added to cart successfully.')
        } else {
            console.error('User information not found in local storage.')
        }
    } catch (error) {
        console.error('Error adding product to cart:', error)
    }
}

const addProduct = async (productData) => {
    const productsCollection = collection(db, 'products')

    try {
        await addDoc(productsCollection, productData)
        console.log('New product added successfully.')

        await fetchProducts()
    } catch (error) {
        console.error('Error adding product:', error)
    }
}

const updateProduct = async () => {
    const productsCollection = collection(db, 'products')

    try {
        await updateDoc(doc(productsCollection, editingProduct.value.id), editingProduct.value)
        console.log('Product updated successfully.')

        closeEditPopup()
        await fetchProducts()
    } catch (error) {
        console.error('Error updating product:', error)
    }
}
const openEditPopup = (product) => {
    editingProduct.value = { ...product }
    isEditingPopupOpen.value = true
}
const closeEditPopup = () => {
    isEditingPopupOpen.value = false
}

const deleteProduct = async (productId) => {
    const productsCollection = collection(db, 'products')

    try {
        await deleteDoc(doc(productsCollection, productId))
        console.log('Product deleted successfully.')

        await fetchProducts()
    } catch (error) {
        console.error('Error deleting product:', error)
    }
}

const submitForm = () => {
    if (newProduct.value.name && newProduct.value.price && newProduct.value.image) {
        addProduct(newProduct.value)
        dialogVisible.value = false
        newProduct.value = { name: '', price: 0, image: '' }
    } else {
        console.error('Please fill in all required fields.')
    }
}

onMounted(() => {
    fetchProducts()
})
</script>

<style scoped>
.product_page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.product_page form {
    width: 300px;
    background: #fff;
}

.product_page .modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
}
.product_list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    column-gap: 24px;
    row-gap: 24px;
    width: 100%;
}
.product_list .product_list_item {
    width: calc(100% / 4 - 18px);
}

.product_list .product_list_item .product_list_item_img {
    width: 100%;
    height: 350px;
    object-fit: cover;
}
.product_list .product_list_item .product_list_item_name {
    text-transform: capitalize;
}

.product_list .product_list_item .product_list_item_button_add {
    width: 100%;
}
</style>
