<template>
</template>
<script>
const fieldType = {
  string: 'string',
  number: 'number',
  datetime: 'datetime',
  textarea: 'textarea',
  picture: 'picture'
}

function getStateName (state, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].state === state) {
      return arr[i].type
    }
  }
}
export default {
  fieldType,
  getStateName
}
</script>