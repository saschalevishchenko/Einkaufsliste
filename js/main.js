Vue.component("product-item", {
  props: ["product"],
  template: `
    <div class="product-item">
      <img :src="product.imageUrl" :alt="product.name" class="product-image" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }} €</p>
      <button @click="addToCart">In den Warenkorb legen</button>
    </div>
  `,
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.product);
    },
  },
});

Vue.component("cart", {
  props: ["cart"],
  template: `
    <div class="cart">
      <h2>Ihr Warenkorb</h2>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <span>{{ item.name }} - {{ item.price }} €</span>
        <button @click="removeFromCart(item)">Entfernen</button>
      </div>
      <p v-if="cart.length === 0">Der Warenkorb ist leer</p>
      <div v-if="cart.length > 0">
        <p>Gesamtbetrag: {{ total }} €</p>
        <button @click="checkout" class="checkout-btn">Warenkorb leeren</button>
      </div>
    </div>
  `,
  computed: {
    total() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },
  },
  methods: {
    removeFromCart(product) {
      this.$emit("remove-from-cart", product);
    },
    checkout() {
      this.$emit("checkout");
    },
  },
});

new Vue({
  el: "#app",
  data() {
    return {
      products: [
        { id: 1, name: "Milch", price: 1, imageUrl: "img/Milch.jpg" },
        { id: 2, name: "Brot", price: 2, imageUrl: "img/Brot.jpg" },
        { id: 3, name: "Eier", price: 2.5, imageUrl: "img/Eier.jpg" },
        { id: 4, name: "Käse", price: 4, imageUrl: "img/Käse.jpg" },
        { id: 5, name: "Butter", price: 5, imageUrl: "img/butter.jpg" },
        { id: 6, name: "Saft", price: 2.5, imageUrl: "img/Saft.jpg" },
        { id: 7, name: "Kaffee", price: 5, imageUrl: "img/Kaffee.jpg" },
        { id: 8, name: "Tee", price: 1.5, imageUrl: "img/Tee.png" },
        {
          id: 9,
          name: "Schokolade",
          price: 3.5,
          imageUrl: "img/Schokolade.jpg",
        },
        {
          id: 10,
          name: "Süßigkeiten",
          price: 3,
          imageUrl: "img/Süßigkeiten.jpg",
        },
      ],
      cart: [],
    };
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.id !== product.id);
    },
    checkout() {
      alert("Ihre Bestellung wird gelöscht!");
      this.cart = [];
    },
  },
});
