import type { Pointer as IPointer, PointerProps } from '@/types';
import '../markers/ConvertLenght.ts';

function newPointer(id:number, l2:any, l1:any): {}{
    let position = convertLen(l2.value, l1.value);
    
    l2.value = position[0];
    l1.value = position[1];
    const newProps: PointerProps = 
    {
      caption: "Chuj mi w cyca",
      category: "Charity",
      // icon: "fa-solid fa-location-dot",
      position: [l1.value, l2.value]
    }

    return {id: id++, props: newProps};
  }