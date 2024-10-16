'use client';

import * as React from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type DataTableConfig, dataTableConfig } from '@/config/data-table';

type FeatureFlagValue = DataTableConfig['featureFlags'][number]['value'];

interface UsersTableContextProps {
  featureFlags: FeatureFlagValue[];
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagValue[]>>;
}

const UsersTableContext = React.createContext<UsersTableContextProps>({
  featureFlags: [],
  setFeatureFlags: () => {},
});

export function useUsersTable() {
  const context = React.useContext(UsersTableContext);
  if (!context) {
    throw new Error('useUsersTable must be used within a TasksTableProvider');
  }
  return context;
}

export function UsersTableProvider({ children }: React.PropsWithChildren) {
  const [featureFlags, setFeatureFlags] = React.useState<FeatureFlagValue[]>(
    []
  );

  return (
    <UsersTableContext.Provider
      value={{
        featureFlags,
        setFeatureFlags,
      }}
    >
      <div className="w-full overflow-x-auto">
        <ToggleGroup
          type="multiple"
          variant="outline"
          size="sm"
          value={featureFlags}
          onValueChange={(value: FeatureFlagValue[]) => setFeatureFlags(value)}
          className="w-fit"
        >
          {dataTableConfig.featureFlags.map((flag) => (
            <Tooltip key={flag.value} delayDuration={250}>
              <ToggleGroupItem
                value={flag.value}
                className="whitespace-nowrap px-3 text-xs"
                asChild
              >
                <TooltipTrigger>
                  <flag.icon
                    className="mr-2 size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  {flag.label}
                </TooltipTrigger>
              </ToggleGroupItem>
              <TooltipContent
                align="start"
                side="bottom"
                sideOffset={6}
                className="bg-background text-foreground flex max-w-60 flex-col space-y-1.5 border py-2 font-semibold"
              >
                <div>{flag.tooltipTitle}</div>
                <div className="text-muted-foreground text-xs">
                  {flag.tooltipDescription}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </ToggleGroup>
      </div>
      {children}
    </UsersTableContext.Provider>
  );
}
