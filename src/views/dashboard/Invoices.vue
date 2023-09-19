<template>
    <div class="page-invoices">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Invoices</h1>
            </div>

            <div class="column is-12">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Client</th>
                            <th>Amount</th>
                            <th>Is Paid</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="invoice in invoices" :key="invoice.id">
                            <td>{{ invoice.invoices }}</td>
                            <td>{{ invoice.name }}</td>
                            <td>{{ invoice.gross_amount }}</td>
                            <td>{{ invoice.is_paid }}</td>
                            <td>
                                <router-link :to="{name:'Invoice',params:{id:invoice.id}}">Details</router-link>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Invoices',
    data(){
        return{
            invoices:[]
        }
    },
    mounted(){
        this.getInvoices()
    },
    methods:{
        getInvoices(){
            axios
                .get('api/v1/invoices')
                .then(response=>{
                    // for(let i=0;i<response.data.length;i++){
                    //     this.invoices.push(response.data[i])
                    // }
                    this.invoices=response.data
                    console.log('data..',this.invoices);
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    }
}

</script>