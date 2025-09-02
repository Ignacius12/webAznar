// Datos estructurados JSON-LD para SEO
document.addEventListener('DOMContentLoaded', function() {
    // Datos estructurados de la organización
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Aznar Textil",
        "url": "https://aznartextil.com",
        "logo": "https://aznartextil.com/assets/images/7-marca-aznar-textil.png",
        "description": "Fabricantes de textiles de alta calidad para hogar, hostelería y colectividades desde 1881",
        "foundingDate": "1881",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "ES",
            "addressLocality": "Valencia"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "Spanish"
        },
        "sameAs": [
            "https://www.instagram.com/aznar_textil/",
            "https://es.linkedin.com/company/aznar-textil-s-l-",
            "https://www.youtube.com/user/aznartextil"
        ]
    };

    // Datos estructurados del sitio web
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Aznar Textil",
        "url": "https://aznartextil.com",
        "description": "Sitio web oficial de Aznar Textil - Fabricantes de textiles desde 1881",
        "publisher": {
            "@type": "Organization",
            "name": "Aznar Textil"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://aznartextil.com/es/producto/producto.html",
            "query-input": "required name=search_term_string"
        }
    };

    // Datos estructurados de la empresa
    const companySchema = {
        "@context": "https://schema.org",
        "@type": "Corporation",
        "name": "Aznar Textil",
        "description": "Empresa textil especializada en la fabricación de tejidos para decoración, hostelería y colectividades",
        "foundingDate": "1881",
        "industry": "Textile Manufacturing",
        "numberOfEmployees": "50-200",
        "knowsAbout": [
            "Textiles para decoración",
            "Tejidos para hostelería",
            "Textiles técnicos",
            "Sostenibilidad textil",
            "Control de calidad"
        ]
    };

    // Función para insertar los datos estructurados
    function insertStructuredData() {
        const schemas = [organizationSchema, websiteSchema, companySchema];
        
        schemas.forEach(schema => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(schema);
            document.head.appendChild(script);
        });
    }

    // Insertar los datos estructurados
    insertStructuredData();
});
