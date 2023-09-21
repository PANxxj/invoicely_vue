<template>
    <div class="page-invoices">
        <div class="columns is-multiline">
            <div class="column is-12">
                <!-- <h1 class="title">Invoice - </h1> -->
                <h1 class="title">Invoice - {{ invoice.invoices }}</h1>

                <hr>
                <button @click="getPdf()" class="button is-dark">Download PDF</button>
            </div>
            <div class="column is-12">
                <h3 class="is-size-4">Client</h3>

                <p><strong>{{ invoice.name }}</strong></p>

                <p v-if="invoice.address1">{{ invoice.address1 }}</p>
                <p v-if="invoice.address2">{{ invoice.address2 }}</p>
                <p v-if="invoice.zipcode || invoice.place">{{ invoice.zipcode }} {{ invoice.place }}</p>
                <p v-if="invoice.country">{{ invoice.country }}</p>

            </div>
            <div class="column is-12">
                <h3 class="is-size-4">Items</h3>

                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Quantiy</th>
                            <th>Amount</th>
                            <!-- <th></th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.net_amount }}</td>
                            <!-- <td>
                                <router-link :to="{name:'Invoice',params:{id:invoice.id}}">Details</router-link>
                            </td> -->

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

const fileDownload=require('js-file-download')

export default {
    name:'Invoice',
    data(){
        return {
            invoice:{},
            items:[]
        }
    },
    async mounted(){
        await this.getInvoice()
        await this.getItem()
    },
    methods:{
        async getInvoice(){
            const invoiceID=this.$route.params.id

            await axios
                .get(`api/v1/invoices/${invoiceID}`)
                .then(response =>{
                    this.invoice=response.data
                    console.log(this.invoice);
                })
                .catch(error =>{
                    console.log(JSON.stringify(error));
                })
        },
        getItem(){
            const invoiceID=this.$route.params.id
            axios
                .get(`api/v1/items/?invoice_id=${invoiceID}`)
                .then(response=>{
                    this.items=response.data
                })
                .catch(error =>{
                    console.log(JSON.stringify(error));
                })
        },
        getPdf(){
             const invoiceID=this.$route.params.id

             axios
                .get(`api/v1/invoices/${invoiceID}/generate_pdf/`,{
                    responseType:'blob',
                })
                .then(res=>{
                    fileDownload(res.data,`invoice_${invoiceID}.pdf`)
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    }
}

</script>

