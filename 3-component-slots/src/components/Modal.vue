<template>
  <div class="container">
    <div class="header">
      <slot name="title" />
    </div>
    <hr />
    <div class="content my-2">
        <slot name="content" />
    </div>
    <slot />
    <hr />
    <div class="footer text-end">
      <button class="btn btn-sm btn-danger me-2">Kapat</button>
      <button class="btn btn-sm btn-success">Kaydet</button>
    </div>
  </div>
</template>