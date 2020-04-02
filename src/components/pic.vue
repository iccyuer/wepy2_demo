<template>
    <div>
        <div>{{src}}</div>
        <image :src="src" />
        <!-- <image src="./images/meishi2.jpg" /> -->
    </div>    
</template>

<script>
import wepy from '@wepy/core';

wepy.component({
    props: {
        src: {
            type: String
        }
    }
})
</script>
