import express, { NextFunction, Request, Response } from "express";

const app = express();
const host = "localhost";
const port = 3001;


const logRequests = (req: Request, res: Response, next: NextFunction) => {
   next()
    
}

type CarType = {
    id: string,
    items: string[];
}

const cars: CarType[] = [
    {id:"string", items:["Range Rover", "BMW"]},
    {id:"string", items:["Tesla", "Mercedez"]}
];


app.use(express.json())
app.use(logRequests);

app.get("/", (req,res,)=>{
    
    res.send("Hello")
})

app.get("/api/cars", (req,res,)=>{
    res.status(201).send(cars)
    
})

app.get("/api/cars/:id", (req,res,)=>{
    const orderId = req.params.id;
    const order = cars.find((order) => order.id === orderId)

    res.status(201).send(cars)
    
})

app.post("/api/cars/", (req,res,)=>{
    const data = req.body;

    const newOrder: CarType={
        id: new Date().toISOString(),
        ...data
    }

    cars.push(newOrder);


    res.status(201).send(`Order created`)
   
})


app.put("/api/cars/:id", (req,res,)=>{
    const orderId = req.params.id;
    const data = req.body;

    const exsitingOrderIndex = cars.findIndex(order => order.id === orderId)
    if(exsitingOrderIndex === -1) {
        throw new Error ("Order not found")
    }

    //updating order:
    const updatedOrder: CarType = {id: cars[exsitingOrderIndex].id, ...data}
    cars[exsitingOrderIndex] = updatedOrder

    res.status(200).send(updatedOrder)
   
})

app.delete("/api/cars/:id", (req,res,)=>{
    const orderId = req.params.id;
    //finding element:
    const exsitingOrderIndex = cars.findIndex(order =>order.id === orderId)
    //if it not exist error handler:
    if(exsitingOrderIndex !== -1) {
      throw new Error(`Order not found so it cannot be deleted`)
    }
  
    //deleting the data otherwise:
    cars.splice(exsitingOrderIndex,1)
  
  
  
  
      res.status(200).send(`Order deleted`)
    
})


const errorHandle = (err: Error,req: Request, res: Response,next: NextFunction) => {
    res.status(404).send(`Sorry nothing found, ${err}`)
}

app.use(errorHandle)


app.listen(3001, "localhost",()=>{
    console.log(`[server]: I am listening on http://${host}:${port}`);
    
})