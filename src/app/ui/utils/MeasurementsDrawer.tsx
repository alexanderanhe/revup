'use client'

import { Measurements } from "@/lib/definitions";
import { PlusIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { Drawer } from "vaul";

type MeasurementsDrawerProps = {
  measurements: Measurements[];
  children: React.ReactNode;
  className?: string;
};

type MeasurementsGroup = {
  [key: string]: (Partial<Measurements> & { ts_time: string })[]
}

export default function MeasurementsDrawer({ measurements, children, ...props }: MeasurementsDrawerProps) {
  const t = useTranslations("measurements");
  const grouped = measurements?.reduce((acc, { created_at, ...rest }) => {
    const key = created_at?.toLocaleDateString();
    if (!key) {
      return acc;
    }
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      ...rest,
      ts_time: created_at?.toLocaleTimeString() ?? ''
    });
    return acc;
  }, {} as MeasurementsGroup);
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger {...props} asChild>
        { children }
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-base-100 border-2 border-base-200 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-[50]">
            <div className="p-4 bg-base-100 rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-base-300 mb-8" />
              <div className="content-grid grid-rows-[auto_1fr_auto] h-full pb-10">
                <Drawer.Title className="font-medium mb-4">
                  { t("title") }
                </Drawer.Title>
                <div className="overflow-y-auto">
                  <table className="table table-xs">
                    
                    { grouped && Object.entries(grouped).map(([ts_date, measurement]) => (
                      <Fragment key={`measurement${ts_date}`}>
                        <thead className="bg-neutral text-neutral-content">
                          <tr>
                            <th colSpan={3}>{ ts_date }</th>
                          </tr>
                        </thead>
                        { measurement?.map(({ ts_time, ...rest }, index) => (
                          <tbody key={`measurement${ts_date}_${ts_time}${index}`}>
                            <tr>
                              <th>{ index + 1 }</th>
                              <td>{ Object.entries(rest).map(([key, value]: [string, any]) => (
                                <span key={`${ts_date}_${ts_time}${index}${key}`} className="block">{ `${key}: ${value}` }</span>
                              )) }</td>
                              <td width={90}>{ ts_time }</td>
                            </tr>
                          </tbody>
                        ))}
                      </Fragment>
                    ))}
                  </table>
                </div>
                <div className="grid grid-rows-auto gap-2 pb-10">
                  <button type="button" disabled className="btn btn-neutral w-full">
                    { t("addBtn") }
                    <PlusIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}