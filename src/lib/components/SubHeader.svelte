<script>
    export let center = true;
</script>

<h2 class:text-center="{center}" class="mb-2"><slot /></h2>

<style>
    h2 {
        font-weight: 800;
    }
</style>