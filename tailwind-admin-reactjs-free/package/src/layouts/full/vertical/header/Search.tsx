// import { useState, useMemo } from 'react';

// import { Icon } from '@iconify/react';
// import SidebarContent from '../sidebar/Sidebaritems';
// import { Link } from 'react-router';
// import SimpleBar from 'simplebar-react';

// function Search() {
//   const [query, setQuery] = useState('');

//   // Recursive search directly on SidebarContent
//   const searchItems = (items: any[], q: string) => {
//     let results: any[] = [];

//     items.forEach((item) => {
//       // Match item itself
//       if (item.name?.toLowerCase().includes(q.toLowerCase()) && item.url) {
//         results.push({ name: item.name, url: item.url });
//       }

//       // Search inside children
//       if (item.children) {
//         results = [...results, ...searchItems(item.children, q)];
//       }
//     });

//     return results;
//   };

//   const results = useMemo(() => {
//     if (!query.trim()) return [];
//     return searchItems(SidebarContent, query);
//   }, [query]);

//   return (
//     <div className="relative w-full max-w-sm">
//       {/* Input Box */}
//       <div className="relative">
//         <Icon
//           icon="solar:magnifer-linear"
//           width="18"
//           height="18"
//           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
//         />

//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full border rounded-xl pl-10 py-2 bg-white dark:bg-dark"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>

//       {/* Dropdown */}
//       {results.length > 0 && (
//         <div className="absolute mt-2 w-full bg-white dark:bg-dark shadow-lg rounded-xl z-50">
//           <SimpleBar className="h-[calc(100vh-100px)]">
//             {results.map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.url}
//                 className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//                 onClick={() => setQuery('')}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </SimpleBar>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Search;

import { useState, useMemo } from 'react';

import { Icon } from '@iconify/react';
import SidebarContent from '../sidebar/Sidebaritems';
import { Link } from 'react-router';
import SimpleBar from 'simplebar-react';
import { Input } from 'src/components/ui/input';

function Search() {
  const [query, setQuery] = useState('');

  // 🔍 Recursive search through menu
  const searchItems = (items: any[], q: string, parentPath = '') => {
    let results: any[] = [];

    items.forEach((item) => {
      const currentPath = parentPath ? `${parentPath} → ${item.name}` : item.name;

      // If match found
      if (item.name?.toLowerCase().includes(q.toLowerCase()) && item.url) {
        results.push({
          name: item.name,
          url: item.url,
          path: currentPath,
          icon: item.icon,
        });
      }

      // Search deeper children
      if (item.children) {
        results = [...results, ...searchItems(item.children, q, currentPath)];
      }
    });

    return results;
  };

  // Memoize filtered results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchItems(SidebarContent, query);
  }, [query]);

  return (
    // <div className="relative w-full max-w-sm">
    //   {/* Search Input */}
    //   <div className="relative">
    //     <Icon
    //       icon="solar:magnifer-linear"
    //       width="18"
    //       height="18"
    //       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
    //     />

    //     <input
    //       type="text"
    //       placeholder="Search..."
    //       className="w-full border rounded-xl pl-10 py-2 bg-white dark:bg-dark"
    //       value={query}
    //       onChange={(e) => setQuery(e.target.value)}
    //     />
    //   </div>

    //   {/* Dropdown Results */}
    //  {results.length > 0 && (
    //     <div className="absolute mt-2 w-full bg-white dark:bg-dark shadow-lg rounded-xl z-50 border">
    //       <SimpleBar className="max-h-60 p-2">
    //         {results.map((item, index) => (
    //           <Link
    //             key={index}
    //             to={item.url}
    //             className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    //             onClick={() => setQuery('')}
    //           >
    //             <div className="flex gap-3 items-start">
    //               {item.icon ? (
    //                 <Icon icon={item.icon} width="20" />
    //               ) : (
    //                 <Icon icon="solar:widget-2-linear" width="20" />
    //               )}
    //               <div>

    //                 <div className="font-medium">{item.name}</div>

    //                 <div className="text-xs text-gray-500 dark:text-gray-400">{item.path}</div>
    //               </div>
    //             </div>
    //           </Link>
    //         ))}
    //       </SimpleBar>
    //     </div>
    //   )}
    // </div>

    <div className="relative w-full">
      {/* <Icon
        icon="solar:magnifer-linear"
        width="18"
        height="18"
        className="absolute left-3 top-1/2 -translate-y-1/2"
      />
      <Input
        placeholder="Search...."
        //   className="w-full py-2 pl-11 pr-2.5 border bg-gray-800 focus:outline-0 border-white/10 rounded-full focus:border-primary placeholder:text-white/40"
        className="rounded-xl pl-10"
        required
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      /> */}

      <div className="relative">
        <div className="flex items-center relative lg:w-xs mx-auto ">
          <Icon
            icon="solar:magnifer-linear"
            width="18"
            height="18"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />

          <Input
            placeholder="Search...."
            className="rounded-xl pl-10"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div
          className={`absolute w-full  bg-white dark:bg-dark rounded-md top-11 z-10 start-0  shadow-md border border-ld ${
            Boolean(query) ? 'block' : 'hidden'
          }`}
        >
          <SimpleBar className="h-72 p-4 custom-scroll">
            {Boolean(results.length) ? (
              results.map((item, i) => (
                <Link
                  key={i}
                  to={item.url}
                  onClick={() => setQuery('')}
                  className="  p-2 mb-1.5 last:mb-0 flex items-center bg-lightgray dark:bg-input/30  gap-2 text-sm font-medium rounded-md hover:bg-primary/20 hover:text-primary w-full"
                >
                  <div className="flex items-center">
                    <Icon icon="iconoir:component" width={18} height={18} />
                    <div className="ps-3">
                      <h5 className="mb-1 text-sm group-hover/link:text-primary">{item.name}</h5>
                      <span className="text-xs block truncate text-darklink">{item.path}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-medium font-medium text-ld">No Components Found!</h1>
              </div>
            )}
          </SimpleBar>
        </div>
      </div>
    </div>
  );
}

export default Search;
