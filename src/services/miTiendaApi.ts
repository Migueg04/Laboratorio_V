async function getProducts (){
    try{
        const response = await fetch ("https://fakestoreapi.com/products")
        const data = response.json();
        console.log("soy el servicio", data)
        return data;
    }catch (error){
        console.error("Ha ocurrido un error", error)
        
    }
}

export default getProducts;
