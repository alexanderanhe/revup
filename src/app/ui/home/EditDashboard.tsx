'use client';

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Card from "../Card";
import { cn } from "@/lib/utils";
import { Plus, Minus, Menu } from "lucide-react";
import { useFormState } from "react-dom";
import { handleDashboard } from "@/lib/actions";
import SubmitButton from "../utils/SubmitButton";

export type DroppableItem = {
  id: number | string;
  name: string;
  key?: string;
  category?: number;
  onHome?: boolean;
};

export default function EditDashboard({ dashboardItems }: { dashboardItems: DroppableItem[] }) {
  const [open, setOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<DroppableItem[]>([
    { id: 1, name: 'You can change the order of widgets on the Dashboard by pulling the icon on the right', onHome: true },
    { id: 2, name: 'More widgets', onHome: false },
  ]);
  const [items, setItems] = useState<DroppableItem[]>(dashboardItems);
  const [ formState, formAction ] = useFormState(handleDashboard, null);

  const rearangeArr = (arr: DroppableItem[], sourceIndex: number, destIndex: number) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
  };

  const onDragEnd = (result: any) => {
    console.log(result);
    // object destructuring - https://www.w3schools.com/react/react_es6_destructuring.asp
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === 'Categories') {
      // a category was moved
      setCategories(rearangeArr(categories, source.index, destination.index));
    } else if (destination.droppableId !== source.droppableId) {
      // find the source in items array and change with destination droppable id
      setItems((items) =>
        items.map((item) =>
          item.id === parseInt(result.draggableId)
            ? {
                ...item,
                category: parseInt(result.destination.droppableId),
              }
            : item
        )
      );
    } else {
      // rearange the array if it is in the same category

      setItems(rearangeArr(items, source.index, destination.index));
    }
  };

  const handleClick = (itemId: number | string, newCategory: number) => () => {
    setItems(
      items.map((i) =>
        i.id === itemId
          ? {
              ...i,
              category: newCategory,
            }
          : i
      )
    )
  }

  useEffect(() => {
    if (formState === 'saved') {
      setOpen(false);
    }
  }, [formState]);

  return (
    <section className="grid justify-center w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        
        <Drawer.Root open={open} shouldScaleBackground>
          <Drawer.Trigger asChild onClick={() => setOpen(true)}>
            <button className="btn btn-ghost">Edit dashboard</button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[50]" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 flex flex-col rounded-t-[10px] h-[96%] bg-base-100 z-[50] mt-24">
              <div className="flex-none mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-8 mt-4" />
              <div className="content-grid overflow-auto rounded-t-[10px] flex-1">
                <div className="max-w-md mx-auto space-y-4">
                  <Drawer.Title className="font-medium mb-4">
                    Edit dashboard
                  </Drawer.Title>
                  <div>
                    {/* type="droppable" is very important here. Look at the docs. */}
                    <Droppable droppableId="Categories" type="droppableItem">
                      {(provided) => (
                        <div ref={provided.innerRef} className="space-y-4">
                          {categories.map((category, index) => (
                            <Draggable
                              draggableId={`category-${category.id}`}
                              key={`category-${category.id}`}
                              index={index}
                              isDragDisabled={false}
                            >
                              {(parentProvider) => (
                                <div
                                  ref={parentProvider.innerRef}
                                  {...parentProvider.draggableProps}
                                >
                                  <Droppable droppableId={category.id.toString()}>
                                    {(provided) => (
                                      <div ref={provided.innerRef}>
                                        <ul className="space-y-2">
                                          {/* Category title is the drag handle for a category */}
                                          <h6
                                            className="mb-3"
                                            {...parentProvider.dragHandleProps}
                                          >
                                            {category.name}
                                          </h6>
                                          {items
                                            .filter(
                                              (item) => item.category === category.id
                                            )
                                            .map((item, index) => (
                                              <Draggable
                                                draggableId={item.id.toString()}
                                                key={item.id}
                                                index={index}
                                                isDragDisabled={!category.onHome}
                                              >
                                                {(provided) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                  >
                                                    <Card className="grid-cols-[auto_1fr_auto] p-2">
                                                      <button
                                                        onClick={handleClick(item.id, category.onHome ? 2 : 1)}
                                                        className={cn("btn btn-xs btn-circle", category?.onHome && "btn-error", !category?.onHome && "btn-success")}>
                                                        { category?.onHome ? <Minus size={24} /> : <Plus size={24} /> }
                                                      </button>
                                                      <Item item={item} />
                                                      { category.onHome && (<button className="btn btn-sm btn-ghost text-base-300"><Menu size={24} /></button>)}
                                                    </Card>
                                                  </div>
                                                )}
                                              </Draggable>
                                            ))}
                                          {provided.placeholder}
                                        </ul>
                                      </div>
                                    )}
                                  </Droppable>
                                </div>
                              )}
                            </Draggable>
                          ))}

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                  <form action={formAction}>
                    <input type="hidden" name="dashboard" value={items.filter(i => i.category === 1).map(i => i.id).join(";")}/>
                    <SubmitButton className="rounded-md mb-6 w-full bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                      Save
                    </SubmitButton>
                    { formState === "error" && <p className="text-error">An error occured. Please try again.</p> }
                  </form>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </DragDropContext>
    </section>
  )
}

type ItemProps = {
  item: {
    id: number | string;
    name: string;
  };
};

function Item({ item }: ItemProps) {
  return (
    <div data-key={item.id}>
      {item.name}
    </div>
  );
}
