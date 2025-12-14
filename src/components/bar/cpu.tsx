import { cn } from "../../lib/utils";
import { Show, createEffect, createSignal } from "solid-js";
import { useProviders } from "../../lib/providers-context";

function Cpu() {
  const { cpu } = useProviders();
  const [cpuSig, setCpuSig] = createSignal(cpu());
  createEffect(() => setCpuSig(cpu()));

  return (
    <Show when={cpuSig()}>
      <div
        class={cn(
          "h-8 flex items-center justify-center gap-2 text-[var(--cpu)] bg-[var(--cpu)]/10 rounded-full pr-3 pl-4"
        )}
      >
        <i class="nf nf-oct-cpu text-lg"></i>
        <span class="text-base">
          {cpuSig()!.usage.toFixed(0)}%
        </span>
      </div>
    </Show>
  );
}

export default Cpu;
