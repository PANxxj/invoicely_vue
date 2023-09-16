<template>
    <div class="page-add-client">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Add Client</h1>
            </div>

            <div class="column is-6">
                <div class="field">
                    <label for="">Name</label>

                    <div class="control">
                        <input type="text" name="" id="" v-model="client.name">
                    </div>
                </div>
            </div>
            <div class="column is-6">

            </div>
            <div class="column is-12">

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddClient',
    data() {
        return {
            client: {}
        }
    },
    methods: {

    }
}

</script>