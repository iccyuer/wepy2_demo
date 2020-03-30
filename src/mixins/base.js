
import eventHub from '../common/eventHub';
export default {
  data: {
    mixin: 'BaseMixin'
  },
  methods: {
  },
  created () {
    console.log('created in mixin');
  },
  onLoad(obj) {
    eventHub.$on('appLaunched', () => {
        console.log('mixin-appLaunched');
        // TODO appLaunched后的base逻辑
        eventHub.$emit('.....')
    })

    console.log('base-mixin-load', obj);
    // TODO 普通base逻辑
    eventHub.$emit('.....')
  }
}
