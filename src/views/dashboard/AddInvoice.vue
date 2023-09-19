<template>
    <div class="page-add-client">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Add Client</h1>
            </div>

            <div class="column is-12">
                <h2 class="is-size-5 mb-4">Client</h2>

                <div class="select">
                    <select name="client" id="" v-model="invoices.client">
                        <option value="" selected>- select client -</option>
                        <option v-for="client in clients" :key="client.id" :value="client">{{ client.name }}</option>

                    </select>
                </div>
                <div class="box mt-4" v-if="invoices.client">
                    <p><strong>{{ invoices.client.name }}</strong></p>
                    <p><strong>Email : </strong>{{ invoices.client.email }}</p>
                    <p v-if="invoices.client.address1">{{ invoices.client.address1 }}</p>
                    <p v-if="invoices.client.address2">{{ invoices.client.address2 }}</p>
                    <p v-if="invoices.client.zipcode || invoices.client.place">{{ invoices.client.zipcode }} {{
                        invoices.client.place }}</p>
                    <p v-if="invoices.client.country">{{ invoices.client.country }}</p>
                </div>
            </div>

            <div class="column is-12">
                <h2 class="is-size-5 mb-4">Items</h2>

                <ItemForm v-for="item in invoices.item" :key="item.item_num" :initialItem="item"
                    v-on:updatePrice="updateTotals"
                />
                <div class="buttons">

                    <button class="button is-light" @click="addMore">Add More</button>
                    <button class="button is-danger" @click="removeItem">Remove</button>
                </div>
                <div class="column is-12">
                    <h2 class="is-size-5 mb-4">Total</h2>
                    <p><strong>Net Amount : </strong>{{ invoices.net_amount }}</p>
                    <p><strong>Vat Amount : </strong>{{ invoices.vat_amount }}</p>
                    <p><strong>Gross Amount : </strong>{{ invoices.gross_amount  }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast'
import ItemForm from '@/components/ItemForm.vue'

export default {
    name: 'AddInvoice',
    components: {
        ItemForm
    },
    data() {
        return {
            invoices: {
                client: '',
                item: [
                    {
                        item_num: 0,
                        title: '',
                        unit_price: '',
                        quantity: 1,
                        vat_rate: 0,
                        net_amount: 0

                    }
                ],
                net_amount:0,
                vat_amount:0,
                gross_amount:0
            },
            clients: []
        }

    },
    async mounted() {
        await this.getClients()
    },
    methods: {
        getClients() {
            axios
                .get('api/v1/clients')
                .then(response => {
                    this.clients = response.data
                })
                .catch(error => {
                    console.log(error);
                })
        },
        addMore() {
            this.invoices.item.push({
                item_num: this.invoices.item.length,
                title: '',
                unit_price: '',
                quantity: 1,
                vat_rate: 0,
                net_amount: 0

            })
        },
        removeItem(){
            this.invoices.item.pop()
        },
        updateTotals(changedItem){
            let net_amount=0
            let vat_amount=0

            let item =  this.invoices.item.filter(i=>i.item_num === changedItem.item_num)

            item=changedItem

            for (let i=0;i<this.invoices.item.length;i++){
                const vat_rate=this.invoices.item[i].vat_rate
            }
        }
    }
}

</script>

<style lang="scss">
.select,
.select select {
    width: 100%;
}
</style>