import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for save a new book

router.post("/", async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "send all required fields"
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
})

//Route to get books
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        response.status(200).json(
            {
                count: books.length,
                data: books,
            }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//ROute to get one book at a time
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        if(!book){
            response.status(404).send({message: "Book not found"});
        }
        response.status(200).json({book});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//Route to update a book
router.put("/:id", async (request,response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            console.log(error.message)
            response.status(400).send({message: error.message})
        }

        const { id } = request.params;
        
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: "Book Not Found"});
        }

        return response.status(200).json({message:"Book updated successfully" , book: request.body}); 

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message:error.message });
    }
})

// Route for delete a book
router.delete("/:id", async (request,response) => {
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            response.status(404).send({message: "Book Not Found"});
        }
        response.status(200).send({message: "Book Deleted successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).json({message: error.message});
        
    }
})

export default router;
