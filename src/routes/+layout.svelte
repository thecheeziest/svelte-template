<script>
    import "../app.css";
    import Header from '$lib/components/Header.svelte';
    import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>Title</title>
</svelte:head>

<div>
    <Header />
    <main>
        <slot />
    </main>
    <Footer />
</div>
