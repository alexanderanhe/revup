'use client';

import { Fragment, useState } from "react";
import Card from "@/components/utils/Card";

type DiscoverProps = {
  media: {
    id: string;
    title: string;
    content: {
      title: string;
      description: string;
      image: string;
    }[];
    contentType: string;
  }[];
}

function Discover({ media }: DiscoverProps) {
  const [ activeTab, setActiveTab ] = useState('all');

  const handleChange = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) setActiveTab(id);
  }

  return (
    <div role="tablist" className="tabs tabs-bordered w-full overflow-auto">
      {media.map(({id, title, content, contentType}) => (
        <Fragment key={id}>
          <input type="radio" name="tab-ondemand" role="tab" className="tab" aria-label={title} checked={activeTab === id} onChange={handleChange(id)} />
          <div role="tabpanel" className="tab-content py-4">
            <div className={`grid grid-cols-${contentType} gap-4 w-full`}>
              { content.map((item) => (
                <Card key={`card${title}${id}`} contentType={contentType} {...item} />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default Discover