import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find();
  }

  async create(book: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async findById(id: number): Promise<Book> {
    return this.bookModel.findById(id);
  }

  async remove(id: number) {
    return this.bookModel.findByIdAndRemove(id);
  }
}
