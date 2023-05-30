<template>
    <form @submit.prevent="addProduct">
        <div class="add-product" v-if="addData">
            <div class="field">
                <label class="label">Jenis Product</label>
                <div class="control">
                    <input v-model="varianInput" class="input" type="text" placeholder="Jenis Product">
                </div>
            </div>

            <div class="field">
                <label class="label">Nama Product</label>
                <div class="control">
                    <input v-model="namaInput" class="input" type="text" placeholder="Nama Product">
                </div>
            </div>

            <div class="field">
                <label class="label">Warna Product</label>
                <div class="control">
                    <input v-model="warnaInput" class="input" type="text" placeholder="warna Product">
                </div>
            </div>

            <div class="field">
                <label class="label">Quantity Product</label>
                <div class="control">
                    <input v-model="quantityInput" class="input" type="text" placeholder="Quantity Product">
                </div>
            </div>

            <div class="field">
                <label class="label">Harga Product</label>
                <div class="control">
                    <input v-model="hargaInput" class="input" type="text" placeholder="Harga Product">
                </div>
            </div>

            <div class="field is-grouped pt-4">
                <div class="control">
                    <button :disabled="!varianInput || !namaInput || !hargaInput" class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button @click="addData = false" class="button is-danger">Cancel</button>
                </div>
            </div>
        </div>
        <div v-else class="add-product">
            <div class="field is-grouped pl-20 pt-4">
                <div class="control">
                    <button class="button is-link" @click="addData = true">Tambah Data</button>
                </div>
            </div>
        </div>
    </form>
    <div class="data-product" v-if="!addData">
        <table class="table" style="margin: 0 auto; background-color: #f3e8dc; border-radius: 5px">
            <thead>
            <tr>
                <th>Jenis Barang</th>
                <th>Nama Barang</th>
                <th>Warna Barang</th>
                <th>Quantity</th>
                <th>Harga Barang</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="data in dataProduct" :key="data.id">
                <th>{{ data.varian }}</th>
                <th>{{ data.nama }}</th>
                <th>{{ data.warna }}</th>
                <th>{{ data.qty }} pcs</th>
                <th>{{ data.harga }}</th>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { db } from '@/firebase'

const addData = ref(false)
const varianInput = ref('')
const namaInput = ref('')
const warnaInput = ref('')
const quantityInput = ref('')
const hargaInput = ref('')

let dataProduct = ref([])

onMounted(async () => {
    /**
     * get data without realtime
     * @type {QuerySnapshot<getDocs>}
     */
    // const querySnapshot = await getDocs(collection(db, 'stockBarang'))
    // let datas = []
    // querySnapshot.forEach((doc) => {
    //     let productData = {
    //         id: doc.id,
    //         varian: doc.data().varian,
    //         nama: doc.data().nama,
    //         qty: doc.data().qty,
    //         harga: doc.data().harga
    //     }
    //     datas.push(productData)
    // });
    // dataProduct.value = datas

    /**
     * get data realtime
     * @type {QuerySnapshot<collection>}
     */

    onSnapshot(collection(db, 'stockBarang'), (val) => {
        let datas = []
        val.forEach((data) => {
            let productData = {
                id: data.id,
                varian: data.data().varian,
                nama: data.data().nama,
                warna: data.data().warna,
                qty: data.data().qty,
                harga: data.data().harga
            }
            datas.push(productData)
        })
        dataProduct.value = datas
    })
})

const addProduct = async () => {
    console.log('asd', {
            id: uuidv4(),
        varian: varianInput.value,
        nama: namaInput.value,
        warna: warnaInput.value,
        qty: quantityInput.value,
        harga: hargaInput.value
    })
    const docRef = await addDoc(collection(db, "stockBarang"), {
        id: uuidv4(),
        varian: varianInput.value,
        nama: namaInput.value,
        warna: warnaInput.value,
        qty: quantityInput.value,
        harga: hargaInput.value
    });
    console.log("Document written with ID: ", docRef.id);
    // addDoc(collection(db, 'stockBarang'), {
    //     id: uuidv4(),
    //     varian: varianInput.value,
    //     nama: namaInput.value,
    //     warna: warnaInput.value,
    //     qty: quantityInput.value,
    //     harga: hargaInput.value
    // })
    // varianInput.value = ''
    // namaInput.value = ''
    // warnaInput.value = ''
    // quantityInput.value = ''
    // hargaInput.value = ''
    // console.log('cuaaaaks', addProduct)
}
</script>

<style>
.add-product {
    width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.data-product {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
}
</style>