// Utility function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// Mock data for services
export const servicesData = [
  {
    id: 1,
    title: "Planning",
    description:
      "Our master plans provide a comprehensive look at where an organization is today.",
    detailContent: {
      description:
        "Our comprehensive planning services help organizations define their future direction and create actionable roadmaps for success.",
      content: `
        <p>Our master plans provide a comprehensive look at where an organization is today, where it wants to be in the future, and how it will get there. We work closely with our clients to understand their unique challenges and opportunities.</p>
        
        <h3>Our Planning Process</h3>
        <ul>
          <li>Initial consultation and needs assessment</li>
          <li>Market research and competitive analysis</li>
          <li>Strategic goal setting and timeline development</li>
          <li>Resource allocation and budget planning</li>
          <li>Implementation roadmap creation</li>
          <li>Ongoing monitoring and adjustment</li>
        </ul>
        
        <p>Whether you're planning a new construction project, renovating an existing space, or developing a long-term facilities strategy, our planning services ensure your project succeeds from concept to completion.</p>
      `,
      image: "https://picsum.photos/seed/blog-modern-arch/600/400",
    },
  },
  {
    id: 2,
    title: "Interior",
    description:
      "You may engage your architect to provide an interior design service, advising on loose furniture.",
    detailContent: {
      title: "Interior Design Excellence",
      description:
        "Transform your space with our comprehensive interior design services that blend functionality with aesthetic beauty.",
      content: `
        <p>You may engage your architect to provide an interior design service, advising on loose furniture, fixtures, and fittings. Our interior design team creates spaces that are not only beautiful but also functional and sustainable.</p>
        
        <h3>Interior Design Services</h3>
        <ul>
          <li>Space planning and layout optimization</li>
          <li>Color scheme and material selection</li>
          <li>Furniture and fixture specification</li>
          <li>Lighting design and implementation</li>
          <li>Custom millwork and built-in solutions</li>
          <li>Project management and installation</li>
        </ul>
        
        <p>From residential homes to commercial offices, our interior design approach focuses on creating environments that enhance the way people live and work while reflecting their personal style and brand identity.</p>
      `,
      image: "/img/services/interior-detail.jpg",
    },
  },
  {
    id: 3,
    title: "Exterior",
    description:
      "Working together with your architect, you will share your project needs, dreams and goals.",
    detailContent: {
      title: "Exterior Design & Architecture",
      description:
        "Create stunning exterior spaces that make a lasting impression while providing functional outdoor environments.",
      content: `
        <p>Working together with your architect, you will share your project needs, dreams and goals. Our exterior design services encompass everything from building facades to landscape architecture, creating cohesive outdoor environments.</p>
        
        <h3>Exterior Design Expertise</h3>
        <ul>
          <li>Architectural facade design</li>
          <li>Landscape architecture and planning</li>
          <li>Outdoor living space creation</li>
          <li>Material selection and weatherproofing</li>
          <li>Sustainable design solutions</li>
          <li>Code compliance and permitting</li>
        </ul>
        
        <p>Our exterior design philosophy emphasizes the relationship between buildings and their surrounding environment, creating spaces that are both visually striking and environmentally responsible.</p>
      `,
      image: "/img/services/exterior-detail.jpg",
    },
  },
  {
    id: 4,
    title: "Sustainability",
    description:
      "We help organizations develop sustainable solutions that reduce environmental impact.",
    detailContent: {
      title: "Sustainable Design Solutions",
      description:
        "Our sustainability experts guide your projects to meet eco-friendly standards while optimizing performance and cost.",
      content: `
        <p>We help organizations develop sustainable solutions that reduce environmental impact and meet evolving regulatory requirements. Our approach integrates green strategies from the earliest design stages.</p>
        
        <h3>Sustainability Services</h3>
        <ul>
          <li>Green building certification (LEED, BREEAM, etc.)</li>
          <li>Energy efficiency and renewable integration</li>
          <li>Water conservation and reuse systems</li>
          <li>Eco-friendly materials selection</li>
          <li>Carbon footprint analysis</li>
          <li>Lifecycle cost analysis</li>
        </ul>
        
        <p>Our designs focus on creating buildings and spaces that minimize environmental impact, lower operational costs, and enhance occupant well-being.</p>
      `,
      image: "/img/services/sustainability-detail.jpg",
    },
  },
  {
    id: 5,
    title: "Project Management",
    description:
      "We ensure your project is delivered on time, within scope, and on budget through expert project management.",
    detailContent: {
      title: "Comprehensive Project Management",
      description:
        "From concept to completion, we coordinate all phases of your project, ensuring seamless communication and efficient execution.",
      content: `
        <p>We offer complete project management services that align every stakeholder and activity toward a successful outcome. Our experienced team monitors timelines, budgets, and quality to ensure smooth delivery.</p>
        
        <h3>Project Management Scope</h3>
        <ul>
          <li>Schedule development and tracking</li>
          <li>Budget control and financial reporting</li>
          <li>Risk management and mitigation</li>
          <li>Vendor coordination and contract oversight</li>
          <li>Quality control and inspection</li>
          <li>Stakeholder communication</li>
        </ul>
        
        <p>Our commitment is to take the stress out of your project, so you can focus on the big picture while we manage the day-to-day details.</p>
      `,
      image: "/img/services/project-management-detail.jpg",
    },
  },
  {
    id: 6,
    title: "Consulting",
    description:
      "Gain expert insight into your design or construction process with our consulting services.",
    detailContent: {
      title: "Architecture & Design Consulting",
      description:
        "Our consulting services help clients make informed decisions, mitigate risks, and optimize design outcomes.",
      content: `
        <p>Whether you're exploring a new venture or troubleshooting an ongoing project, our consultants provide critical analysis and creative problem-solving to support your goals.</p>
        
        <h3>Consulting Expertise</h3>
        <ul>
          <li>Feasibility studies and site evaluations</li>
          <li>Design critique and value engineering</li>
          <li>Building code and zoning review</li>
          <li>Construction document assessment</li>
          <li>Procurement strategy guidance</li>
          <li>Owner representation and advisory</li>
        </ul>
        
        <p>We bring a fresh perspective, backed by years of industry experience, to help you achieve clarity and confidence in every decision.</p>
      `,
      image: "/img/services/consulting-detail.jpg",
    },
  },
];

// Helper function to get service by slug
export const getServiceBySlug = (slug) => {
  return servicesData.find((service) => generateSlug(service.title) === slug);
};

// Helper function to generate slug from title (exported for use in other components)
export { generateSlug };

// Helper function to get all services
export const getAllServices = () => {
  return servicesData;
};

export const getRecentServices = (limit = 3) => {
  return servicesData.slice(0, limit);
};

// Mock data for blog posts
export const blogData = [
  {
    id: 1,
    title: "Modern Architecture Trends 2024",
    excerpt:
      "Discover the latest trends in modern architecture that are shaping the future of design and construction.",
    content: `
      <p>Modern architecture continues to evolve with new technologies and changing lifestyle needs. In 2024, we're seeing exciting trends that blend sustainability, technology, and human-centric design.</p>
      
      <h3>Key Trends This Year</h3>
      <ul>
        <li>Sustainable and eco-friendly materials</li>
        <li>Smart home integration</li>
        <li>Biophilic design elements</li>
        <li>Flexible multi-purpose spaces</li>
        <li>Minimalist aesthetics with maximum functionality</li>
      </ul>
      
      <p>These trends reflect our growing awareness of environmental responsibility and the need for spaces that adapt to our changing work and lifestyle patterns.</p>
    `,
    image: "https://picsum.photos/seed/blog-modern-arch/800/600",
    author: "John Smith",
    date: "2024-03-15",
    category: "Architecture",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Sustainable Interior Design Solutions",
    excerpt:
      "Learn how to create beautiful interiors while maintaining environmental consciousness and sustainability.",
    content: `
      <p>Sustainable interior design is no longer a trend—it's a necessity. As we become more aware of our environmental impact, designers are finding creative ways to create beautiful spaces with minimal ecological footprint.</p>
      
      <h3>Sustainable Design Principles</h3>
      <ul>
        <li>Use of recycled and upcycled materials</li>
        <li>Energy-efficient lighting solutions</li>
        <li>Low-VOC paints and finishes</li>
        <li>Locally sourced materials</li>
        <li>Durable, long-lasting furniture</li>
      </ul>
      
      <p>By implementing these principles, we can create spaces that are not only beautiful but also contribute to a healthier planet.</p>
    `,
    image: "https://picsum.photos/seed/blog-sustainable/800/600",
    author: "Emma Wilson",
    date: "2024-03-10",
    category: "Interior Design",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Smart Home Technology Integration",
    excerpt:
      "Explore how modern technology can be seamlessly integrated into residential and commercial spaces.",
    content: `
      <p>Smart home technology has revolutionized the way we interact with our living and working spaces. From automated lighting to intelligent climate control, technology is making our spaces more comfortable and efficient.</p>
      
      <h3>Popular Smart Home Features</h3>
      <ul>
        <li>Automated lighting and climate control</li>
        <li>Smart security systems</li>
        <li>Voice-controlled assistants</li>
        <li>Energy monitoring systems</li>
        <li>Integrated entertainment systems</li>
      </ul>
      
      <p>The key to successful smart home integration is balancing functionality with aesthetics, ensuring technology enhances rather than dominates the space.</p>
    `,
    image: "https://picsum.photos/seed/blog-smart-home/800/600",
    author: "Michael Brown",
    date: "2024-03-05",
    category: "Technology",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Outdoor Living Space Design",
    excerpt:
      "Transform your outdoor areas into functional living spaces that extend your home's comfort and style.",
    content: `
      <p>Outdoor living spaces have become an essential extension of our homes. Whether it's a small balcony or a large backyard, these areas offer opportunities to connect with nature while maintaining comfort and style.</p>
      
      <h3>Design Elements for Outdoor Spaces</h3>
      <ul>
        <li>Weather-resistant furniture and materials</li>
        <li>Outdoor lighting for ambiance</li>
        <li>Plants and landscaping for privacy</li>
        <li>Fire features for year-round use</li>
        <li>Outdoor kitchen and dining areas</li>
      </ul>
      
      <p>By thoughtfully designing outdoor spaces, we can create seamless transitions between indoor and outdoor living.</p>
    `,
    image: "https://picsum.photos/seed/blog-outdoor/800/600",
    author: "Sarah Johnson",
    date: "2024-02-28",
    category: "Outdoor Design",
    readTime: "5 min read",
  },
];

// Helper function to get blog post by slug
export const getBlogBySlug = (slug) => {
  return blogData.find((blog) => generateSlug(blog.title) === slug);
};

// Helper function to get all blog posts
export const getAllBlogs = () => {
  return blogData;
};

// Helper function to get recent blog posts (limit)
export const getRecentBlogs = (limit = 4) => {
  return blogData.slice(0, limit);
};

export const projectData = [
  {
    id: 1,
    year: 2010,
    category: "House",
    location: "Dubai, UAE",
    title: "Seascape Villa",
    image: "https://picsum.photos/seed/seascape-villa/800/600",
    excerpt:
      "The Seascape Villas project constitutes one of the first urban interventions...",
    description:
      "The Seascape Villas project constitutes one of the first urban interventions in the new Dubai Waterfront development. The project consists of 15 luxury villas, each with its own private beach access and stunning views of the Arabian Gulf. The design emphasizes the connection between indoor and outdoor living spaces, with large glass facades that open onto private terraces and infinity pools.",
    gallery: [
      "https://picsum.photos/seed/seascape-villa-1/800/600",
      "https://picsum.photos/seed/seascape-villa-2/800/600",
    ],
  },
  {
    id: 2,
    year: 2009,
    category: "Cultural",
    location: "Strasbourg, France",
    title: "European Lard Station",
    image: "https://picsum.photos/seed/european-station/800/600",
    excerpt:
      "Headquarters of the European Parliament including a 750-seat hemicycle...",
    description:
      "The European Parliament headquarters in Strasbourg represents a landmark architectural achievement that combines functionality with symbolic significance. The complex includes a 750-seat hemicycle for parliamentary sessions, extensive office spaces for MEPs and staff, and public areas designed to reflect the democratic values of the European Union. The building's design emphasizes transparency and accessibility, with glass facades that allow citizens to observe the democratic process.",
    gallery: [
      "https://picsum.photos/seed/european-station-1/800/600",
      "https://picsum.photos/seed/european-station-2/800/600",
    ],
  },
  {
    id: 3,
    year: 2012,
    category: "Residental",
    location: "Paris, France",
    title: "Yabroudi Villa",
    image: "https://picsum.photos/seed/yabroudi-villa/800/600",
    excerpt:
      "Calm, quiet areas designed for family life and reception areas...",
    description:
      "The Yabroudi Villa in Paris exemplifies modern residential architecture that prioritizes family living while maintaining elegant design principles. The villa features calm, quiet areas designed for family life and reception areas that can accommodate large gatherings. The design seamlessly integrates indoor and outdoor spaces, with a focus on natural light and sustainable materials. The villa's layout promotes both privacy and social interaction, creating a perfect balance for modern family living.",
    gallery: [
      "https://picsum.photos/seed/yabroudi-villa-1/800/600",
      "https://picsum.photos/seed/yabroudi-villa-2/800/600",
    ],
  },
  {
    id: 4,
    year: 2013,
    category: "Cultural",
    location: "Muscat, Oman",
    title: "Cultural Complex Centre",
    image: "https://picsum.photos/seed/cultural-complex/800/600",
    excerpt:
      "Cultural Centre emerges from a unique landscape between sea and mountains...",
    description:
      "The Cultural Complex Centre in Muscat emerges from a unique landscape between sea and mountains, creating a harmonious relationship with its natural surroundings. The complex includes performance spaces, exhibition halls, and educational facilities that celebrate Omani culture while providing modern amenities. The architecture draws inspiration from traditional Omani design elements while incorporating contemporary construction techniques and sustainable design principles.",
    gallery: [
      "https://picsum.photos/seed/cultural-complex-1/800/600",
      "https://picsum.photos/seed/cultural-complex-2/800/600",
    ],
  },
  {
    id: 5,
    year: 2011,
    category: "House",
    location: "Guangzhou, China",
    title: "Dalbourne Villa",
    image: "https://picsum.photos/seed/dalbourne-villa/800/600",
    excerpt:
      "Located in the northern part of Guangzhou near Bai Yun mountain...",
    description:
      "Located in the northern part of Guangzhou near Bai Yun mountain, the Dalbourne Villa represents a fusion of modern architectural principles with traditional Chinese design philosophy. The villa's design emphasizes the connection between architecture and nature, with carefully planned views of the surrounding landscape and mountain vistas. The project demonstrates how contemporary residential architecture can respect and enhance its natural setting while providing luxurious living spaces.",
    gallery: [
      "https://picsum.photos/seed/dalbourne-villa-1/800/600",
      "https://picsum.photos/seed/dalbourne-villa-2/800/600",
    ],
  },
  {
    id: 6,
    year: 2015,
    category: "Hotel",
    location: "Amman, Jordan",
    title: "Amman Rotana Hotel",
    image: "https://picsum.photos/seed/amman-hotel/800/600",
    excerpt: "54-room hotel with restaurants, spa, fitness centre and more...",
    description:
      "The Amman Rotana Hotel is a 54-room luxury hotel that combines contemporary design with traditional Jordanian hospitality. The hotel features multiple restaurants, a comprehensive spa, fitness centre, and conference facilities. The design emphasizes comfort and functionality while creating an atmosphere of luxury and sophistication. The hotel's architecture reflects the cultural heritage of Amman while providing modern amenities for international travelers.",
    gallery: [
      "https://picsum.photos/seed/amman-hotel-1/800/600",
      "https://picsum.photos/seed/amman-hotel-2/800/600",
    ],
  },
  {
    id: 7,
    year: 2014,
    category: "Commercial",
    location: "London, UK",
    title: "Canary Wharf Tower",
    image: "https://picsum.photos/seed/canary-wharf/800/600",
    excerpt:
      "Modern office complex with sustainable design and green spaces...",
    description:
      "The Canary Wharf Tower represents a new generation of sustainable commercial architecture in London's financial district. The 45-story building features state-of-the-art office spaces, green building technologies, and extensive public areas. The design incorporates energy-efficient systems, natural ventilation, and green roofs that contribute to the building's LEED Platinum certification. The tower's glass facade reflects the surrounding urban landscape while providing optimal natural light for occupants.",
    gallery: [
      "https://picsum.photos/seed/canary-wharf-1/800/600",
      "https://picsum.photos/seed/canary-wharf-2/800/600",
    ],
  },
  {
    id: 8,
    year: 2016,
    category: "Cultural",
    location: "Barcelona, Spain",
    title: "Contemporary Art Museum",
    image: "https://picsum.photos/seed/art-museum/800/600",
    excerpt: "Innovative museum design with flexible exhibition spaces...",
    description:
      "The Contemporary Art Museum in Barcelona showcases innovative architectural design that serves as both a cultural landmark and a functional exhibition space. The museum features flexible gallery spaces that can accommodate various types of contemporary art, from large-scale installations to intimate video works. The building's design emphasizes the relationship between art and architecture, with carefully controlled lighting and spatial sequences that enhance the visitor experience.",
    gallery: [
      "https://picsum.photos/seed/art-museum-1/800/600",
      "https://picsum.photos/seed/art-museum-2/800/600",
    ],
  },
  {
    id: 9,
    year: 2013,
    category: "Residental",
    location: "Tokyo, Japan",
    title: "Minimalist Apartment Complex",
    image: "https://picsum.photos/seed/tokyo-apartments/800/600",
    excerpt:
      "Zen-inspired residential design with efficient space utilization...",
    description:
      "The Minimalist Apartment Complex in Tokyo embodies the principles of Japanese design philosophy, emphasizing simplicity, functionality, and harmony with nature. The complex features 120 apartments designed with efficient space utilization and natural materials. Each unit incorporates traditional Japanese elements such as sliding screens, tatami rooms, and carefully positioned windows that frame views of the surrounding cityscape. The design promotes a sense of community while respecting individual privacy.",
    gallery: [
      "https://picsum.photos/seed/tokyo-apartments-1/800/600",
      "https://picsum.photos/seed/tokyo-apartments-2/800/600",
    ],
  },
  {
    id: 10,
    year: 2017,
    category: "Hotel",
    location: "Marrakech, Morocco",
    title: "Desert Oasis Resort",
    image: "https://picsum.photos/seed/desert-resort/800/600",
    excerpt: "Luxury desert resort with traditional Moroccan architecture...",
    description:
      "The Desert Oasis Resort in Marrakech combines traditional Moroccan architecture with modern luxury amenities. The resort features 85 guest rooms, multiple restaurants, a spa, and conference facilities, all designed to provide an authentic Moroccan experience. The architecture draws inspiration from traditional riads and kasbahs, with courtyards, water features, and intricate geometric patterns. The design emphasizes sustainability and local craftsmanship, using traditional building techniques and materials.",
    gallery: [
      "https://picsum.photos/seed/desert-resort-1/800/600",
      "https://picsum.photos/seed/desert-resort-2/800/600",
    ],
  },
  {
    id: 11,
    year: 2015,
    category: "House",
    location: "Sydney, Australia",
    title: "Coastal Modern Villa",
    image: "https://picsum.photos/seed/coastal-villa/800/600",
    excerpt: "Contemporary beachfront residence with sustainable design...",
    description:
      "The Coastal Modern Villa in Sydney represents contemporary Australian architecture that responds to its coastal environment. The villa features large glass facades that open onto outdoor living spaces, creating a seamless connection between indoor and outdoor areas. The design incorporates sustainable features such as solar panels, rainwater harvesting, and natural ventilation systems. The architecture celebrates the spectacular ocean views while providing comfortable, year-round living spaces that adapt to the coastal climate.",
    gallery: [
      "https://picsum.photos/seed/coastal-villa-1/800/600",
      "https://picsum.photos/seed/coastal-villa-2/800/600",
    ],
  },
  {
    id: 12,
    year: 2018,
    category: "Cultural",
    location: "Istanbul, Turkey",
    title: "Ottoman Heritage Center",
    image: "https://picsum.photos/seed/ottoman-center/800/600",
    excerpt: "Cultural center preserving Ottoman architectural traditions...",
    description:
      "The Ottoman Heritage Center in Istanbul serves as a bridge between historical preservation and contemporary cultural programming. The center houses exhibition spaces, research facilities, and educational programs dedicated to Ottoman art and architecture. The building's design respectfully incorporates traditional Ottoman architectural elements while providing modern functionality. The project demonstrates how historical architecture can be adapted for contemporary use while preserving cultural heritage.",
    gallery: [
      "https://picsum.photos/seed/ottoman-center-1/800/600",
      "https://picsum.photos/seed/ottoman-center-2/800/600",
    ],
  },
  {
    id: 13,
    year: 2016,
    category: "Commercial",
    location: "Singapore",
    title: "Green Office Tower",
    image: "https://picsum.photos/seed/green-tower/800/600",
    excerpt:
      "Sustainable office building with vertical gardens and green technology...",
    description:
      "The Green Office Tower in Singapore represents the future of sustainable commercial architecture. The 50-story building features extensive vertical gardens, green roofs, and innovative environmental systems. The design incorporates natural ventilation, solar shading, and rainwater collection systems that contribute to the building's net-zero energy goals. The tower's distinctive facade, covered in living plants, serves as both an environmental feature and a visual landmark in Singapore's skyline.",
    gallery: [
      "https://picsum.photos/seed/green-tower-1/800/600",
      "https://picsum.photos/seed/green-tower-2/800/600",
    ],
  },
  {
    id: 14,
    year: 2019,
    category: "Residental",
    location: "Vancouver, Canada",
    title: "Mountain View Condominiums",
    image: "https://picsum.photos/seed/mountain-condos/800/600",
    excerpt: "Luxury condominiums with panoramic mountain and ocean views...",
    description:
      "The Mountain View Condominiums in Vancouver offer luxury living with spectacular views of the surrounding mountains and ocean. The development features 200 units ranging from one to four bedrooms, each designed to maximize the natural light and views. The architecture emphasizes the connection to the natural landscape, with large windows, outdoor terraces, and communal spaces that celebrate the site's unique location. The design incorporates sustainable building practices and energy-efficient systems.",
    gallery: [
      "https://picsum.photos/seed/mountain-condos-1/800/600",
      "https://picsum.photos/seed/mountain-condos-2/800/600",
    ],
  },
  {
    id: 15,
    year: 2017,
    category: "Hotel",
    location: "Reykjavik, Iceland",
    title: "Northern Lights Hotel",
    image: "https://picsum.photos/seed/northern-lights-hotel/800/600",
    excerpt:
      "Boutique hotel designed for aurora viewing and geothermal wellness...",
    description:
      "The Northern Lights Hotel in Reykjavik offers a unique hospitality experience centered around Iceland's natural wonders. The boutique hotel features 45 rooms, each designed to provide optimal viewing of the aurora borealis during winter months. The design incorporates geothermal heating systems, natural hot springs, and sustainable building materials. The architecture celebrates Iceland's dramatic landscape while providing modern comfort and luxury amenities for guests seeking an authentic Nordic experience.",
    gallery: [
      "https://picsum.photos/seed/northern-lights-hotel-1/800/600",
      "https://picsum.photos/seed/northern-lights-hotel-2/800/600",
    ],
  },
];

// Helper function to get all projects
export const getAllProjects = () => {
  return projectData;
};

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
  return projectData.find((project) => generateSlug(project.title) === slug);
};

// Helper function to get recent projects (limit)
export const getRecentProjects = (limit = 6) => {
  return projectData.slice(0, limit);
};

export const productData = [
  {
    id: 2075,
    name: "Bertt Side table",
    image: "https://picsum.photos/seed/bertt-side-table/800/600",
    sku: "PR104",
    categories: ["accessories"],
    tags: ["modern"],
    specs: {
      Weight: "1 kg",
      Dimensions: "20 x 30 x 20 cm",
    },
    gallery: [
      "https://picsum.photos/seed/bertt-side-table-1/800/600",
      "https://picsum.photos/seed/bertt-side-table-2/800/600",
      "https://picsum.photos/seed/bertt-side-table-3/800/600",
    ],
  },
  {
    id: 2076,
    name: "Coffee Table",
    image: "https://picsum.photos/seed/coffee-table/800/600",
    sku: "PR101",
    categories: ["accessories"],
    tags: ["casual", "classic"],
    specs: {
      Weight: "1.2 kg",
      Dimensions: "30 x 40 x 30 cm",
      Material: "Oak wood",
    },
    gallery: [
      "https://picsum.photos/seed/coffee-table-1/800/600",
      "https://picsum.photos/seed/coffee-table-2/800/600",
      "https://picsum.photos/seed/coffee-table-3/800/600",
    ],
  },
  {
    id: 2073,
    name: "Modern End Table",
    image: "https://picsum.photos/seed/modern-end-table-2/800/600",
    sku: "PR106",
    categories: ["accessories"],
    tags: ["casual", "classic"],
    specs: {
      Weight: "1.1 kg",
      Dimensions: "22 x 32 x 22 cm",
      Material: "Metal frame",
    },
    gallery: [
      "https://picsum.photos/seed/modern-end-table-2-1/800/600",
      "https://picsum.photos/seed/modern-end-table-2-2/800/600",
      "https://picsum.photos/seed/modern-end-table-2-3/800/600",
    ],
  },
  {
    id: 2077,
    name: "Modern End Table",
    image: "https://picsum.photos/seed/modern-end-table/800/600",
    sku: "PR102",
    categories: ["accessories"],
    tags: ["casual"],
    specs: {
      Weight: "1.3 kg",
      Dimensions: "24 x 30 x 25 cm",
      Material: "Walnut wood",
    },
    gallery: [
      "https://picsum.photos/seed/modern-end-table-1/800/600",
      "https://picsum.photos/seed/modern-end-table-2/800/600",
      "https://picsum.photos/seed/modern-end-table-3/800/600",
    ],
  },
  {
    id: 2074,
    name: "Side Table",
    image: "https://picsum.photos/seed/side-table/800/600",
    sku: "PR103",
    categories: ["accessories"],
    tags: ["modern"],
    specs: {
      Weight: "0.9 kg",
      Dimensions: "18 x 28 x 18 cm",
      Material: "Pine wood",
    },
    gallery: [
      "https://picsum.photos/seed/side-table-1/800/600",
      "https://picsum.photos/seed/side-table-2/800/600",
      "https://picsum.photos/seed/side-table-3/800/600",
    ],
  },
  {
    id: 2072,
    name: "Soft chair",
    image: "https://picsum.photos/seed/soft-chair/800/600",
    sku: "PR105",
    categories: ["accessories"],
    tags: ["casual", "modern"],
    specs: {
      Weight: "2 kg",
      Dimensions: "40 x 50 x 45 cm",
      Material: "Fabric & Wood",
    },
    gallery: [
      "https://picsum.photos/seed/soft-chair-1/800/600",
      "https://picsum.photos/seed/soft-chair-2/800/600",
      "https://picsum.photos/seed/soft-chair-3/800/600",
    ],
  },
  {
    id: 2078,
    name: "Wooden Chair",
    image: "https://picsum.photos/seed/wooden-chair/800/600",
    sku: "PR108",
    categories: ["accessories"],
    tags: ["modern"],
    specs: {
      Weight: "2.2 kg",
      Dimensions: "42 x 55 x 47 cm",
      Material: "Solid oak",
    },
    gallery: [
      "https://picsum.photos/seed/wooden-chair-1/800/600",
      "https://picsum.photos/seed/wooden-chair-2/800/600",
      "https://picsum.photos/seed/wooden-chair-3/800/600",
    ],
  },
  {
    id: 2071,
    name: "Wooden Nightstand",
    image: "https://picsum.photos/seed/wooden-nightstand/800/600",
    sku: "PR107",
    categories: ["accessories"],
    tags: ["classic"],
    specs: {
      Weight: "1.5 kg",
      Dimensions: "25 x 35 x 25 cm",
      Material: "MDF with veneer",
    },
    gallery: [
      "https://picsum.photos/seed/wooden-nightstand-1/800/600",
      "https://picsum.photos/seed/wooden-nightstand-2/800/600",
      "https://picsum.photos/seed/wooden-nightstand-3/800/600",
    ],
  },
  {
    id: 2079,
    name: "Wooden Table",
    image: "https://picsum.photos/seed/wooden-table/800/600",
    sku: "PR109",
    categories: ["accessories"],
    tags: ["classic", "modern"],
    specs: {
      Weight: "3.2 kg",
      Dimensions: "60 x 120 x 75 cm",
      Material: "Solid oak wood",
    },
    gallery: [
      "https://picsum.photos/seed/wooden-table-1/800/600",
      "https://picsum.photos/seed/wooden-table-2/800/600",
      "https://picsum.photos/seed/wooden-table-3/800/600",
    ],
  },
  {
    id: 2080,
    name: "Modern Lamp",
    image: "https://picsum.photos/seed/modern-lamp/800/600",
    sku: "PR110",
    categories: ["accessories"],
    tags: ["modern"],
    specs: {
      Weight: "0.8 kg",
      Dimensions: "15 x 15 x 45 cm",
      Material: "Metal & Glass",
    },
    gallery: [
      "https://picsum.photos/seed/modern-lamp-1/800/600",
      "https://picsum.photos/seed/modern-lamp-2/800/600",
      "https://picsum.photos/seed/modern-lamp-3/800/600",
    ],
  },
  {
    id: 2081,
    name: "Vintage Mirror",
    image: "https://picsum.photos/seed/vintage-mirror/800/600",
    sku: "PR111",
    categories: ["accessories"],
    tags: ["classic"],
    specs: {
      Weight: "2.8 kg",
      Dimensions: "50 x 70 x 5 cm",
      Material: "Wooden frame",
    },
    gallery: [
      "https://picsum.photos/seed/vintage-mirror-1/800/600",
      "https://picsum.photos/seed/vintage-mirror-2/800/600",
      "https://picsum.photos/seed/vintage-mirror-3/800/600",
    ],
  },
  {
    id: 2082,
    name: "Storage Cabinet",
    image: "https://picsum.photos/seed/storage-cabinet/800/600",
    sku: "PR112",
    categories: ["accessories"],
    tags: ["modern", "casual"],
    specs: {
      Weight: "4.5 kg",
      Dimensions: "80 x 40 x 180 cm",
      Material: "Plywood & Metal",
    },
    gallery: [
      "https://picsum.photos/seed/storage-cabinet-1/800/600",
      "https://picsum.photos/seed/storage-cabinet-2/800/600",
      "https://picsum.photos/seed/storage-cabinet-3/800/600",
    ],
  },
  {
    id: 2083,
    name: "Decorative Vase",
    image: "https://picsum.photos/seed/decorative-vase/800/600",
    sku: "PR113",
    categories: ["accessories"],
    tags: ["classic"],
    specs: {
      Weight: "0.6 kg",
      Dimensions: "12 x 12 x 25 cm",
      Material: "Ceramic",
    },
    gallery: [
      "https://picsum.photos/seed/decorative-vase-1/800/600",
      "https://picsum.photos/seed/decorative-vase-2/800/600",
      "https://picsum.photos/seed/decorative-vase-3/800/600",
    ],
  },
  {
    id: 2084,
    name: "Wall Shelf",
    image: "https://picsum.photos/seed/wall-shelf/800/600",
    sku: "PR114",
    categories: ["accessories"],
    tags: ["modern"],
    specs: {
      Weight: "1.8 kg",
      Dimensions: "60 x 20 x 15 cm",
      Material: "Floating shelf design",
    },
    gallery: [
      "https://picsum.photos/seed/wall-shelf-1/800/600",
      "https://picsum.photos/seed/wall-shelf-2/800/600",
      "https://picsum.photos/seed/wall-shelf-3/800/600",
    ],
  },
  {
    id: 2085,
    name: "Floor Rug",
    image: "https://picsum.photos/seed/floor-rug/800/600",
    sku: "PR115",
    categories: ["accessories"],
    tags: ["casual", "classic"],
    specs: {
      Weight: "2.5 kg",
      Dimensions: "120 x 180 cm",
      Material: "Wool blend",
    },
    gallery: [
      "https://picsum.photos/seed/floor-rug-1/800/600",
      "https://picsum.photos/seed/floor-rug-2/800/600",
      "https://picsum.photos/seed/floor-rug-3/800/600",
    ],
  },
];

export const getAllProducts = () => {
  return productData;
};

export const getProductBySlug = (slug) => {
  return productData.find((product) => generateSlug(product.name) === slug);
};

// Mock data for team members
export const teamData = [
  {
    id: 1,
    name: "Marry Hopkins",
    title: "Architectural Technician",
    school: "Harvard Graduate School of Design",
    image: "https://picsum.photos/400/380?random=1",
  },
  {
    id: 2,
    name: "Alfred Howard",
    title: "Architectural Drafter",
    school: "MIT School of Architecture",
    image: "https://picsum.photos/400/380?random=2",
  },
  {
    id: 3,
    name: "Thomas Fress",
    title: "Art Director",
    school: "Yale School of Architecture",
    image: "https://picsum.photos/400/380?random=3",
  },
  {
    id: 4,
    name: "Hank Howard",
    title: "Art Director",
    school: "Columbia Graduate School of Architecture",
    image: "https://picsum.photos/400/380?random=4",
  },
  {
    id: 5,
    name: "Emily Ratajkovski",
    title: "Architect",
    school: "University of Pennsylvania School of Design",
    image: "https://picsum.photos/400/380?random=5",
  },
  {
    id: 6,
    name: "Julia Traplin",
    title: "Architectural Technician",
    school: "Cornell University College of Architecture",
    image: "https://picsum.photos/400/380?random=6",
  },
];

// Helper function to get all team members
export const getAllTeamMembers = () => {
  return teamData;
};
