<template>
    <div class="page-add-client">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Edit {{ client.name }}</h1>
            </div>

            <div class="column is-6">
                <div class="field">
                    <label for="">Name</label>

                    <div class="control">
                        <input type="text" name="name" id="" class="input" v-model="client.name">
                    </div>
                </div>
                <div class="field">
                    <label for="">Email</label>

                    <div class="control">
                        <input type="email" name="email" class="input" id="" v-model="client.email">
                    </div>
                </div>
                <div class="field">
                    <label for="">Address1</label>

                    <div class="control">
                        <input type="text" name="address1" class="input" id="" v-model="client.address1">
                    </div>
                </div>
                <div class="field">
                    <label for="">Address2</label>

                    <div class="control">
                        <input type="text" name="address2" class="input" id="" v-model="client.address2">
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="">Zipcode</label>

                    <div class="control">
                        <input type="text" name="zipcode" class="input" id="" v-model="client.zip_code">
                    </div>
                </div>
                <div class="field">
                    <label for="">Place</label>

                    <div class="control">
                        <input type="text" name="place" class="input" id="" v-model="client.place">
                    </div>
                </div>
                <div class="field">
                    <label for="">Country</label>

                    <div class="control">
                        <input type="text" name="country" class="input" id="" v-model="client.country">
                    </div>
                </div>
            </div>
            <div class="column is-12">
                <div class="field">
                    <div class="control">
                        <button class="button is-success" @click="submiForm">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

export default {
    name: 'EditClient',
    data() {
        return {
            // client: {
            //     name:'',
            //     email:'',
            //     address1:'',
            //     address2:'',
            //     place:'',
            //     zip_code:'',
            //     country:''
            // }
            client: {}
        }
    },
    mounted() {
        this.getClient()
    },
    methods: {
        async submiForm() {
            const clientID = this.$route.params.id
            console.log('data...........clent', this.client);
            await axios
                .put(`api/v1/clients/${clientID}/`, this.client)
                .then(response => {
                    toast({
                        message: 'The client was edited',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                    this.$router.push('/dashboard/clients')
                })
                .catch(error => {
                    console.log(JSON.stringify(error));
                })
        },
        getClient() {
            const clientID = this.$route.params.id
            console.log(this.$route.params);

            axios
                .get(`api/v1/clients/${clientID}/`)
                .then(response => {
                    this.client = response.data
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}

</script>