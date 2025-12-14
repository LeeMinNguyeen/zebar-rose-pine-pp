import { cn } from "../../lib/utils";
import { Match, Show, Switch } from "solid-js/web";
import { createEffect, createSignal } from "solid-js";
import { useProviders } from "../../lib/providers-context";

function Battery() {
  const { battery } = useProviders();
  const [batterySig, setBatterySig] = createSignal(battery());
  createEffect(() => setBatterySig(battery()));

  return (
    <Show when={batterySig()}>
      <div
        class={cn(
          "h-8 flex items-center justify-center gap-2 text-[var(--battery)] bg-[var(--battery)]/10 rounded-full pr-3 pl-4",
          {
            "text-[var(--battery-low)] animate-flash":
              batterySig()!.chargePercent < 20,
            "text-[var(--battery-mid)]":
              batterySig()!.chargePercent > 20 &&
              batterySig()!.chargePercent < 70,
            "text-[var(--battery-good)]":
              (batterySig()!.chargePercent >= 70 &&
                batterySig()!.chargePercent < 90) ||
              batterySig()!.isCharging,
          }
        )}
      >
        <Switch>
          <Match
            when={batterySig()!.isCharging && batterySig()!.chargePercent < 100}
          >
            <i class="ti ti-battery-charging text-2xl"></i>
          </Match>
          <Match
            when={batterySig()!.chargePercent > 90 && !batterySig()!.isCharging}
          >
            <i class="ti ti-battery-4 text-2xl"></i>
          </Match>
          <Match
            when={batterySig()!.chargePercent > 70 && !batterySig()!.isCharging}
          >
            <i class="ti ti-battery-3 text-2xl"></i>
          </Match>
          <Match
            when={batterySig()!.chargePercent > 40 && !batterySig()!.isCharging}
          >
            <i class="ti ti-battery-2 text-2xl"></i>
          </Match>
          <Match
            when={batterySig()!.chargePercent > 20 && !batterySig()!.isCharging}
          >
            <i class="ti ti-battery-1 text-2xl"></i>
          </Match>
          <Match
            when={batterySig()!.chargePercent > 0 && !batterySig()!.isCharging}
          >
            <i class="ti ti-battery-exclamation text-lg text-current"></i>
          </Match>
        </Switch>
        <span class="text-base">
          {batterySig()!.chargePercent.toFixed(0)}%
        </span>
      </div>
    </Show>
  );
}

export default Battery;
