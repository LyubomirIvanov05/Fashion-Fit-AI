<script lang="ts">
        import { convertFileToBase64 } from "$lib/utils/openai-helpers";
    import Icon from "@iconify/svelte";
      import Dropzone from "svelte-file-dropzone";
  
      let isLoading = $state(false);
      let errorMessage = $state("");
      let recognizedClothes = $state<OpenAiFit[]>([]);
        let clothesSuccessfullyAdded = $state(false);

      interface OpenAiFit{
          brand: string;
          clothingType: string;
      }
  
      async function handleDrop(e: CustomEvent<any>) {
          const {acceptedFiles} = e.detail;
         
          if(acceptedFiles.length){
              isLoading = true;
              const fileToSendToOpenAi = acceptedFiles[0];
              const base64String = await convertFileToBase64(fileToSendToOpenAi);
  
  
              try{
                  const response = await fetch("/api/scan", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json"
                      },
                      body: JSON.stringify({base64: base64String})
                  }); 
  
                  isLoading = false;
                  const result = await response.json() as { clothesArray: OpenAiFit[] };
                  console.log(result);
  
                  recognizedClothes = result.clothesArray;
  
  
              }
              catch(error){
                  errorMessage = "An error occurred while processing the image. Please try again.";
              }
          }
          else{
              errorMessage = "Could not upload given file. Are you sure it's an image with a file size less than 10MB?";
          }
      }
  </script>
  
  <h2 class="mt-[32px] mb-[64px] font-bold text-[60px] text-center">Take a picture to add clothes</h2>
  {#if recognizedClothes.length === 0}
  <div class="upload-area">
      <div class="upload-container">
          {#if errorMessage}
          <h4 class="text-center mb-4 upload-error text-2xl">{errorMessage}</h4>
          {/if}
          {#if isLoading}
          <div class="spinner-container">
              <div class="spinner">
                  <p class="text-center">Proccesing your clothes</p>
              </div>
          </div>
          {:else}
          <Dropzone
              on:drop={handleDrop}
              multiple={false}
              accept="image/*"
              maxSize={10 * 1024 * 1024}
              containerClasses={"dropzone-cover"}
          >
          <Icon icon="bi:camera-fill" width={"40"}/>
          <p>Drag a picture here or click to select a file</p>
          </Dropzone>
          {/if}
      </div>
  </div>
  {:else if !clothesSuccessfullyAdded}
  <div class="found-clothes flex justify-center">
    <table class="clothes-list width-full bg-white rounded-lg border-collapse">
        <thead>
            <tr>
                <th>Brand</th>
                <th>Type</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each recognizedClothes as clothing}
            <tr>
                <td>{clothing.brand}</td>
                <td>{clothing.clothingType}</td>
                <td>
                    <button type="button"
                    aria-label="Remove clothing"
                    class="remove-clothing"
                    onclick={() => console.log("Delete")}>
                    <Icon icon="streamline:delete-1-solid" width={"24"}/>
                </button>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
  </div>
  {/if}

  <style>
    :global(.dropzone-cover){
        height: 100%;
        border-radius: 15px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center !important;
        border: unset;
        cursor: pointer;
        border-style: solid !important;
        width: 40%;
    justify-self: center;
    }
    .clothes-list th{
        font-size: 22px;
        text-align: left;
        padding: 8px 16px;
        border-bottom: 3px solid black;
    }

    .clothes-list td{
        padding: 12px 16px;
        border-bottom: 1px solid rbg(205, 205, 205);
        font-size: 22px;
    }

    .clothes-list tr:last-child td{
        border-bottom: none;
    }
    .upload-error{
        color: rgb(131, 0, 0);
    }

  </style>