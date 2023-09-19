<template>
    <div class="columns">
        <div class="column is-3">
            <div class="field">
                <label for="">Title</label>
                <div class="control">
                    <input type="text" name="" id="" class="input" v-model="items.title">
                </div>
            </div>
        </div>

        <div class="column is-3">
            <div class="field">
                <label for="">Price</label>
                <div class="control">
                    <input type="text" name="" id="" class="input" v-model="items.unit_price">
                </div>
            </div>
        </div>
        <div class="column is-3">
            <div class="field">
                <label for="">Quantity</label>
                <div class="control">
                    <input type="number" name="" id="" class="input" v-model="items.quantity">
                </div>
            </div>
        </div>
        <div class="column is-2">
            <div class="field">
                <label for="">Vat Rate</label>
                <div class="control">
                    <div class="select">
                        <select name="" id="" v-model="items.vat_rate">
                            <option value="0">0%</option>
                            <option value="14">14%</option>
                            <option value="25">25%</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-2">
            <div class="field">
                <label for="">Gross Amount</label>
                <div class="control">
                    <input type="text" name="" id="" class="input" :value="gross_amount" disabled>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ItemForm',
    props: {
        initialItem: Object
    },
    data() {
        return {
            items: this.initialItem
        }
    },
    computed: {
        gross_amount() {
            const unit_price = this.items.unit_price
            const quantity = this.items.quantity
            const vat_rate = this.items.vat_rate

            this.items.net_amount = unit_price * quantity
            this.$emit('updatePrice',this.items)

            return this.items.net_amount + (this.items.net_amount * (vat_rate / 100))
        }
    }
}

</script>