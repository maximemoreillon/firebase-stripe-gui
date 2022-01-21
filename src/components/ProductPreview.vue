<template>
  <v-card
    height="100%"
    width="250"
    :to="{name: 'product', params: {product_id: product.id}}">
    <v-img
      height="250"
      :src="product.data.images[0]"/>
    <v-card-title>{{product.data.name}}</v-card-title>
    <v-card-subtitle>{{product.data.description}}</v-card-subtitle>
  </v-card>
</template>

<script>
  export default {
    name: 'ProductPreview',
    props: {
      product: Object,
    },
    data: () => ({

    }),
  }
</script>
