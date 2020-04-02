<template>
    <div>
        <image :src="src" />   
        <!-- <image src="./images/ico_my_pressed.png" />    -->
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
