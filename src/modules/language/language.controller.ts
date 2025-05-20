import { Body, Controller, Get, Post } from "@nestjs/common";
import { LanguageService } from "./language.service";
import { CreateLanguageDto } from "./dtos";

@Controller("languages")
export class LanguageController {
    constructor(private service: LanguageService) { }

    @Get()
    async getAll() {
        return await this.service.getAll()
    }
    @Post()
  async create(@Body() payload: CreateLanguageDto) {
    return await this.service.create(payload);
  }
}