import { useState, useEffect } from 'react';

type QuickLinkType = {
  title: string;
  url: string;
  iconUrl: string;
  color: string;
};

export default function QuickLinks() {
  const [links, setLinks] = useState<QuickLinkType[]>([]);
  const urls = ['https://figma.com']; // List of URLs to fetch

  useEffect(() => {
    const fetchData = async () => {
      // fetchWebsiteInfo('https://figma.com')
    };

    fetchData();
  }, []);

  return (
    <div className='h-full w-full border'>
      <h1 className='font-serif text-lg font-thin'>Quick Links</h1>
      <div className='grid h-full w-full grid-cols-3 gap-4'>
        {links.map((link, index) => (
          <div
            key={index}
            className='border p-4'
            style={{ backgroundColor: link.color }}
          >
            <img
              src={link.iconUrl}
              alt={`${link.title} icon`}
              className='h-8 w-8'
            />
            <h2 className='font-medium'>{link.title}</h2>
            <a
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500'
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
