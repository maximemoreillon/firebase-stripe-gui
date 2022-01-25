<template>
  <v-card
    height="100%"
    width="250"
    :to="{name: 'product', params: {product_id: product.id}}"
    hover>

    <v-img
      height="250"
      :src="product.data.images[0]"/>

    <v-card-title class="justify-center">
      {{product.data.name}}
    </v-card-title>

    <v-card-subtitle class="text-center">
      {{product.data.description}}
    </v-card-subtitle>

  </v-card>
</template>

<script>
  export default {
    name: 'ProductPreview',
    props: {
      product: Object,
    },
  }
</script>
