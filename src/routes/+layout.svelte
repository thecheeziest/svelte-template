<script>
    import "../app.css";
    import Header from '$lib/components/Header.svelte';
    import Footer from "$lib/components/Footer.svelte";
</script>

<div>
    <Header />
    <main>
        <slot />
    </main>
    <Footer />
</div>