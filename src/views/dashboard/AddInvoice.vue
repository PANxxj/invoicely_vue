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

                <ItemForm v-for="item in invoices.items" :key="item.item_num" :initialItem="item"
                    v-on:updatePrice="updateTotals" />
                <div class="buttons">

                    <button class="button is-light" @click="addMore">Add More</button>
                    <button class="button is-danger" @click="removeItem">Remove</button>
                </div>
                <div class="column is-12">
                    <h2 class="is-size-5 mb-4">Misc</h2>

                    <div class="field">
                        <label for="">Due Days</label>

                        <div class="control">
                            <input type="text" class="input" v-model="invoices.due_days">
                        </div>
                    </div>
                    <div class="field">
                        <label for="">Sender refrence</label>

                        <div class="control">
                            <input type="text" class="input" v-model="invoices.sender_refrence">
                        </div>
                    </div>
                </div>
                <div class="column is-12">
                    <h2 class="is-size-5 mb-4">Total</h2>
                    <p><strong>Net Amount : </strong>{{ invoices.net_amount }}</p>
                    <p><strong>Vat Amount : </strong>{{ invoices.vat_amount }}</p>
                    <p><strong>Gross Amount : </strong>{{ invoices.gross_amount }}</p>
                </div>
                <div class="column is-12">
                    <button class="button is-success" @click="submitForm">Save</button>
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
                items: [
                    {
                        item_num: 0,
                        title: '',
                        unit_price: '',
                        quantity: 1,
                        vat_rate: 0,
                        net_amount: 0

                    }
                ],
                sender_refrence:'',
                due_days:14,
                net_amount: 0,
                vat_amount: 0,
                gross_amount: 0
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
            this.invoices.items.push({
                item_num: this.invoices.items.length,
                title: '',
                unit_price: '',
                quantity: 1,
                vat_rate: 0,
                net_amount: 0

            })
        },
        removeItem() {
            this.invoices.items.pop()
        },
        updateTotals(changedItem) {
            let net_amount = 0
            let vat_amount = 0

            let item = this.invoices.items.filter(i => i.item_num === changedItem.item_num)

            item = changedItem

            for (let i = 0; i < this.invoices.items.length; i++) {
                const vat_rate = this.invoices.items[i].vat_rate

                vat_amount += this.invoices.items[i].net_amount * (vat_rate / 100)
                net_amount += this.invoices.items[i].net_amount
            }
            this.invoices.net_amount = net_amount
            this.invoices.vat_amount = parseFloat(vat_amount).toFixed(2)
            this.invoices.gross_amount = net_amount + vat_amount
            this.invoices.discount_amount = 0
        },
        submitForm() {
            this.invoices.name = this.invoices.client.name
            this.invoices.email = this.invoices.client.email
            this.invoices.org_number = this.invoices.client.org_number
            this.invoices.address1 = this.invoices.client.address1
            this.invoices.zipcode = this.invoices.client.zipcode
            this.invoices.place = this.invoices.client.place
            this.invoices.country = this.invoices.client.country
            this.invoices.contact_person = this.invoices.client.contact_person
            this.invoices.contact_refrence = this.invoices.client.contact_refrence
            this.invoices.client = this.invoices.client.id

            axios
                .post('api/v1/invoices/', this.invoices)
                .then(response => {
                    toast({
                        message: 'The invoice has been added',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right'
                    })
                    this.$router.push('/dashboard/invoices')
                })
                .catch(error => {
                    console.log(error);
                })
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