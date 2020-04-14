<template>
    <div>
        <h2>profile</h2>
        <div v-for="(item, index) in list" :key="index" @tap="handleTap(index)">{{ item.name }}</div>
        <div style="border: 1px solid #999;"></div>
        <div v-for="(item, index) in list2" :key="index+'1'" @tap="handleTap2(index)">{{ item.name }}</div>
    </div>
</template>

<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        list: [],
        list2: []
    },
    onLoad() {
        this.list = [
            { name: 'hehe' },
            { name: 'hehe1' },
            { name: 'hehe2' }
        ]
        this.list2 = this.list
        // this.list2 = JSON.parse(JSON.stringify(this.list))
    },
    methods: {
        handleTap(index) {
            // item.name = Math.random()
            this.list[index].name = Math.random()
            console.log('list', this.list);
            console.log('list2', this.list2);
        },
        handleTap2(index) {
            // this.list2[index].name = Math.random()
            this.$set(this.list2[index], 'name', Math.random())
            console.log('list', this.list)
            console.log('list2', this.list2)
        }
    }
})

</script>

