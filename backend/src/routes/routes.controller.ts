import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    ValidationPipe
} from '@nestjs/common'
import { AirPollutionReqDto } from './dto/air-pollution-req.dto'
import { AuthJwtGuard } from 'src/auth/guard/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interfaces/auth-request.interface'
import { GetRouteDto } from './dto/get-route.dto'
import { RateRouteDto } from './dto/rate-route.dto'
import { RoutesService } from './routes.service'
import { UseGuards } from '@nestjs/common'
import { Req } from '@nestjs/common'

@Controller('routes')
export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}

    @Get()
    get(
        @Query('startNodeLat') startNodeLat: number,
        @Query('startNodeLong') startNodeLong: number,
        @Query('endNodeLat') endNodeLat: number,
        @Query('endNodeLong') endNodeLong: number
    ) {
        const request = new GetRouteDto(startNodeLat, startNodeLong, endNodeLat, endNodeLong)
        return this.routesService.getRoute(request);
    }

    @Post('rate')
    @UseGuards(AuthJwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async rateRoute(
        @Req() req: AuthenticatedRequest,
        @Body(ValidationPipe) rateRouteDto: RateRouteDto
    ): Promise<void> {
        await this.routesService.rateRoute(rateRouteDto, req.user.id)

        return
    }

    @Post('air-pollution')
    airPollution(@Body(ValidationPipe) airPollutionReqDtos: AirPollutionReqDto[]) {
        return this.routesService.airPollution(airPollutionReqDtos)
    }
}
