<template>
  <v-data-table :loading="loading" :items="payments" :headers="headers">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Payments</v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:item.created="{ item }">
      <span>{{ format_date(item.created) }}</span>
    </template>
  </v-data-table>
</template>

<script>
import { firestore } from "@/firebase"
import { collection, doc, getDocs } from "firebase/firestore"

export default {
  name: "UserPayments",
  props: {},
  mounted() {
    this.get_payments()
  },
  watch: {
    user() {
      this.get_payments()
    },
  },
  data: () => ({
    loading: false,
    payments: [],
    headers: [
      // {text: 'ID', value: 'id'},
      { text: "Amount", value: "amount" },
      { text: "Currency", value: "currency" },
      { text: "Status", value: "status" },
      { text: "Date", value: "created" },
    ],
  }),
  methods: {
    async get_payments() {
      if (!this.user) return
      this.loading = true
      try {
        const customersCollectionRef = collection(firestore, "customers")
        const customerDocRef = doc(customersCollectionRef, this.user.uid)
        const paymentsCollectionRef = collection(customerDocRef, "payments")
        const querySnapshot = await getDocs(paymentsCollectionRef)
        this.payments = querySnapshot.docs.map((doc) => doc.data())
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    format_date(epoch) {
      const date = new Date(epoch * 1000)
      return date.toLocaleString()
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>
