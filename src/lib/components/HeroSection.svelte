<script lang="ts">
    import heroImage from "$assets/hero-img.png";
    import { Button } from "$components";
</script>

<section class="mx-[13vw] flex justify-between items-center mt-[50px] mb-[80px]">
    <div class="flex flex-col items-start w-[55%] pr-[50px]">
        <h1 class="text-[90px] font-bold mt-16">Fashion Fit</h1>
        <h2 class="text-[32px]">Your Personal Digital Wardrobe</h2>
        <p class="text-[24px]">Create your very own digital closet where you can catalog every piece you own, plan your outfits, and get inspired by new trends.</p>
        <p class="mb-4 text-[24px]">Our app offers a sleek, modern design and an intuitive interface that makes managing your style effortless and fun.</p>
        <Button href="/register">Sign Up</Button>
    </div>
    <img src={heroImage} alt="Hero" class="w-[45%]">
</section>


