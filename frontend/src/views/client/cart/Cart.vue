<template>
  <div class="content">
    <div class="p-5">
      <h2>
        Cart
      </h2>
      <span class="text-muted small">
        You can feeling confortable who will have well experience
      </span>
      <hr/>
    </div>
  </div>

  <div class="pb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-5 bg-white rounded shadow mb-5">

          <!-- Shopping cart table -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="">
                  <th scope="col" class="border-0 bg-light">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Remove</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="">
                  <th scope="row" class="border-0">
                    <div class="p-2">
                      <img src="https://bootstrapious.com/i/snippets/sn-cart/product-1.jpg" alt="" width="70"
                        class="img-fluid rounded shadow-sm">
                      <div class="ms-3 d-inline-block align-middle">
                        <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">Timex Unisex
                            Originals</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category:
                          Watches</span>
                      </div>
                    </div>
                  </th>
                  <td class="border-0 align-middle"><strong>$79.00</strong></td>
                  <td class="border-0 align-middle"><strong>3</strong></td>
                  <td class="border-0 align-middle ps-4">
                    <a href="#" class="text-dark text-center">
                      <i class='bx bx-x-circle' ></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- End Shopping cart table -->
        </div>
      </div>

      <div class="row py-5 p-4 bg-white rounded shadow">
        <div class="col-lg-6">
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Coupon code</div>
          <div class="p-4">
            <p class="italic mb-4">If you have a coupon code, please enter it in the box below</p>
            <div class="input-group mb-4 border rounded-pill p-2">
              <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3"
                class="form-control border-0">
              <div class="input-group-append border-0">
                <button id="button-addon3" type="button" class="btn btn-dark px-4 rounded-pill"><i
                    class="fa fa-gift me-2"></i>Apply coupon</button>
              </div>
            </div>
          </div>
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Instructions for seller</div>
          <div class="p-4">
            <p class="italic mb-4">If you have some information for the seller you can leave them in the box below</p>
            <textarea name="" cols="30" rows="2" class="form-control"></textarea>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary</div>
          <div class="p-4">
            <p class="italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
            <ul class="list-unstyled mb-4">
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order
                  Subtotal</strong><strong>$390.00</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and
                  handling</strong><strong>$10.00</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong
                  class="text-muted">Tax</strong><strong>$0.00</strong></li>
              <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                <h5 class="fw-bold">$400.00</h5>
              </li>
            </ul>
            <a href="#" class="btn btn-dark rounded-pill py-2 d-block">Proceed to checkout</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
}
</script>

<style scoped></style>
