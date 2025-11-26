import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageContent } from './entities/page-content.entity';
import { UpdatePageContentDto } from './dto/update-page-content.dto';

@Injectable()
export class PageContentService {
  constructor(
    @InjectRepository(PageContent)
    private readonly pageContentRepository: Repository<PageContent>,
  ) {}

  async findOne(): Promise<PageContent> {
    // Try to find the first record (there should only be one)
    const allContent = await this.pageContentRepository.find({
      order: { id: 'ASC' },
      take: 1,
    });
    
    let content = allContent.length > 0 ? allContent[0] : null;

    if (!content) {
      // Create default content if it doesn't exist (don't specify id, let it auto-increment)
      content = this.pageContentRepository.create({
        wine1: 'Cabernet Sauvignon',
        wine2: 'Merlot',
        wine3: 'Syrah/Shiraz',
        wine4: 'Pinot Noir',
        home_main_text_en: 'Gagauz and Bulgarian Cuisine Restaurant',
        home_main_text_ro: 'Restaurant de bucătărie Găgăuză şi Bulgară',
        home_main_text_ru: 'Ресторан Гагаузской и Болгарской кухни',
        home_main_description_en: 'We welcome guests with an authentic atmosphere and sincere hospitality.',
        home_main_description_ro: 'Întâmpinăm oaspeții cu o ambianță autentică și ospitalitate sinceră.',
        home_main_description_ru: 'Мы встречаем гостей с аутентичной атмосферой и искренним гостеприимством.',
        home_traditions_title_en: 'Gagauz traditions in Chișinău',
        home_traditions_title_ro: 'Tradiții Găgăuze în orașul Chișinău',
        home_traditions_title_ru: 'Традиции Гагаузов в Кишинёве',
        home_traditions_text_en: 'In Gagauz cuisine, lamb plays an important role and is used in various dishes; the Gagauz appreciate lamb for its delicate taste and because it has been part of their culinary tradition since ancient times.',
        home_traditions_text_ro: 'În bucătăria găgăuză, carnea de miel joacă un rol important și este folosită în diverse feluri. Găgăuzii apreciază mielul pentru gustul său delicat și pentru că face parte din tradiția lor culinară încă din vechime.',
        home_traditions_text_ru: 'В Гагаузской кухне баранина играет важную роль и используется в различных блюдах; гагаузы ценят баранину за её деликатный вкус и за то, что она является частью их кулинарных традиций с древних времен.',
        home_traditions_wines_en: 'Here are some wines that pair excellently with lamb dishes:',
        home_traditions_wines_ro: 'Iată câteva vinuri care se potrivesc excelent cu preparatele din carne de miel:',
        home_traditions_wines_ru: 'Вот несколько вин, которые отлично сочетаются с блюдами из баранины:',
        photos_photo_title_en: 'Relax in a unique ambiance',
        photos_photo_title_ro: 'Relaxați-vă într-o ambianță unică',
        photos_photo_title_ru: 'Расслабьтесь в уникальной атмосфере',
        photos_restaurant_description_en: 'The restaurant is decorated with traditional Gagauz elements, including carved wooden furniture, colorful textiles, and traditional motifs.',
        photos_restaurant_description_ro: 'Restaurantul este decorat cu elemente tradiționale găgăuze. Acestea includ mobilier din lemn sculptat, țesături colorate, și motive tradiționale.',
        photos_restaurant_description_ru: 'Ресторан оформлен в традиционном гагаузском стиле, включая резную деревянную мебель, яркие текстили и традиционные мотивы.',
        photos_restaurant_atmosphere_en: 'Atmosphere is warm and welcoming, reflecting the hospitality of the Gagauz people.',
        photos_restaurant_atmosphere_ro: 'Atmosfera este caldă și primitoare, reflectând ospitalitatea găgăuzilor.',
        photos_restaurant_atmosphere_ru: 'Атмосфера теплая и гостеприимная, отражая гостеприимство гагаузов.',
        gagauz_culture_title_en: 'A Distinct Culture in Southern Moldova',
        gagauz_culture_title_ro: 'O cultură distinctă în sudul Moldovei',
        gagauz_culture_title_ru: 'Уникальная культура на юге Молдовы',
        gagauz_culture_location_en: 'Gagauzia is an autonomous region located in the south of the Republic of Moldova, known for its predominantly Gagauz population, an ethnic group of Turkic origin.',
        gagauz_culture_location_ro: 'Găgăuzia este o regiune autonomă situată în sudul Republicii Moldova, cunoscută pentru populația sa predominant găgăuză, un grup etnic de origine turcică.',
        gagauz_culture_location_ru: 'Гагаузия — автономный регион на юге Республики Молдова, известный своим преобладающим гагаузским населением, этнической группой тюркского происхождения.',
        gagauz_culture_languages_en: 'The Gagauz culture is unique and distinctive, blending Turkic influences with local Moldovan traditions. The Gagauz language, part of the Turkic language family, is spoken alongside Romanian and Russian. The region is renowned for its traditional customs, cultural festivals, and distinctive cuisine, which reflects a combination of flavors and culinary techniques inherited from Turkic ancestors and adapted to local conditions.',
        gagauz_culture_languages_ro: 'Cultura găgăuză este unică și distinctă, îmbinând influențe turcice cu tradițiile locale moldovenești. Limba găgăuză, parte a familiei limbilor turcice, este vorbită alături de limba română și rusă. Regiunea este renumită pentru obiceiurile sale tradiționale, festivalurile culturale și bucătăria specifică, care reflectă o combinație de arome și tehnici culinare moștenite de la strămoșii turcici și adaptate condițiilor locale.',
        gagauz_culture_languages_ru: 'Гагаузская культура уникальна и отличается, сочетая тюркские влияния с местными молдавскими традициями. Гагаузский язык, часть тюркской языковой семьи, используется наряду с румынским и русским языками. Регион знаменит своими традиционными обычаями, культурными фестивалями и уникальной кухней, которая отражает сочетание ароматов и кулинарных техник, унаследованных от тюркских предков и адаптированных к местным условиям.',
        gagauz_culture_example_en: 'Gagauzia is an example of ethnic and cultural diversity in Moldova, contributing to the country\'s rich cultural heritage.',
        gagauz_culture_example_ro: 'Găgăuzia este un exemplu de diversitate etnică și culturală în Moldova, contribuind la bogăția culturală a țării.',
        gagauz_culture_example_ru: 'Гагаузия является примером этнического и культурного разнообразия в Молдове, способствуя культурному богатству страны.',
        images: [
          '/assets/images/surpa.png',
          'https://straus.s3.amazonaws.com/media/CACHE_IMG/products2/a8e68509f9e34fd381d8070e2b7aa3eb/96e39763f14900ac5719e9ec719a8c78.webp',
          'https://straus.s3.amazonaws.com/media/CACHE_IMG/products2/b91acd91a22e4ce3bfc6e9ebccce8fd2/c7fc65dc1036c355c949ddb35f70f5b8.webp',
          'https://straus.s3.amazonaws.com/media/CACHE_IMG/products2/22070080a0234aef9e1c28d15fc8c342/f8882cf91547433b16347bb00612fe49.webp',
          'https://straus.s3.amazonaws.com/media/CACHE_IMG/products2/fef6e61bff0044db8d42f26fc6e86888/dbcd5b36c3d4bdca29a11dd098a544f9.webp',
        ],
      });
      content = await this.pageContentRepository.save(content);
    }

    return content;
  }

  async update(updatePageContentDto: UpdatePageContentDto): Promise<PageContent> {
    try {
      const allContent = await this.pageContentRepository.find({
        order: { id: 'ASC' },
        take: 1,
      });
      
      let content = allContent.length > 0 ? allContent[0] : null;

      if (!content) {
        content = await this.findOne();
      }

      // Only assign properties that are defined (not undefined)
      const dtoAny = updatePageContentDto as any;
      const contentAny = content as any;
      
      Object.keys(updatePageContentDto).forEach((key) => {
        if (dtoAny[key] !== undefined) {
          contentAny[key] = dtoAny[key];
        }
      });

      return await this.pageContentRepository.save(content);
    } catch (error) {
      console.error('Error in update service:', error);
      throw error;
    }
  }

  async getPublicContent(language: string = 'ro'): Promise<any> {
    const content = await this.findOne();
    const lang = language.substring(0, 2);
    const contentAny = content as any;

    return {
      wines: [content.wine1, content.wine2, content.wine3, content.wine4],
      images: content.images || [],
      home: {
        main_text: contentAny[`home_main_text_${lang}`] || content.home_main_text_ro,
        main_description: contentAny[`home_main_description_${lang}`] || content.home_main_description_ro,
        traditions_title: contentAny[`home_traditions_title_${lang}`] || content.home_traditions_title_ro,
        traditions_text: contentAny[`home_traditions_text_${lang}`] || content.home_traditions_text_ro,
        traditions_wines: contentAny[`home_traditions_wines_${lang}`] || content.home_traditions_wines_ro,
      },
      photos: {
        photo_title: contentAny[`photos_photo_title_${lang}`] || content.photos_photo_title_ro,
        restaurant_description: contentAny[`photos_restaurant_description_${lang}`] || content.photos_restaurant_description_ro,
        restaurant_atmosphere: contentAny[`photos_restaurant_atmosphere_${lang}`] || content.photos_restaurant_atmosphere_ro,
      },
      gagauz_culture: {
        title: contentAny[`gagauz_culture_title_${lang}`] || content.gagauz_culture_title_ro,
        gagauz_location: contentAny[`gagauz_culture_location_${lang}`] || content.gagauz_culture_location_ro,
        gagauz_languages: contentAny[`gagauz_culture_languages_${lang}`] || content.gagauz_culture_languages_ro,
        gagauz_example: contentAny[`gagauz_culture_example_${lang}`] || content.gagauz_culture_example_ro,
      },
    };
  }
}

