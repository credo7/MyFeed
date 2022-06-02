import { useState } from 'react';

import Header from '../../components/Header';
import { useWindowSize } from '../../hooks/UseWindowSize';
import Chat from './Chat';
import DirectList from './DirectList';

export default function Direct() {
  const size = useWindowSize();
  const [isChatOpen] = useState(true);

  return (
    <>
      <div className="max-h-[100vh] overflow-hidden w-full ">
        {size.width < 550 && isChatOpen ? '' : <Header />}
        <div className="sm:px-8">
          <div className="h-[calc(100vh-100px)] flex flex-row sm:mt-4 xl:w-[1240px] mx-auto sm:border-[1px] border-gray-100 sm:shadow-md rounded-[32px] mb-2">
            {size.width < 800 && isChatOpen ? (
              ''
            ) : (
              <div className="w-full md:w-[25%] min-w-[314px] md:bg-white md:rounded-l-[32px]">
                <DirectList />
              </div>
            )}
            {size.width > 800 || isChatOpen ? (
              <div className="min-h-full w-full md:w-[75%]">
                <Chat
                  username={'Andrew'}
                  messages={[
                    { text: 'Hello guyes', timeStamp: 'Lol', owner: false },
                  ]}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
}
