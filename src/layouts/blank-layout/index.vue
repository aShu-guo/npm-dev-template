<script>
import { RouterView } from 'vue-router';
import { h } from 'vue';

export default {
  setup(_props, { attrs, slots }) {
    return () => {
      return h(RouterView, { ...attrs }, slots);
    };
  },
};
</script>
