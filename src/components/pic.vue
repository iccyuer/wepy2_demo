<template>
    <div>
        <div>{{src}}</div>
        <div>--{{form.a}}--,-{{form2}}</div>
        <!-- <image :src="src" /> -->
        <!-- <image src="./images/meishi2.jpg" /> -->
    </div>    
</template>

<script>
import wepy from '@wepy/core';

wepy.component({
    props: {
        src: {
            type: String
        },
        form: {
            type: Object,
            default() {
                return {
                    a: 2
                }
            }
        },
        form2: {
            type: String
        }
    }
})
</script>
