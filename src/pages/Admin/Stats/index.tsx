import { useState, useEffect } from "react";
import { useGetStats } from "@/api/stats/useGetStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { StatsResponse } from "@/interfaces/stats.interface";

const Stats = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [stats, setStats] = useState<StatsResponse | null>(null);

  const getStats = useGetStats();

  useEffect(() => {
    // Load stats on mount with no date filter
    handleFetchStats();
  }, []);

  const handleFetchStats = async () => {
    const payload = {
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    };

    const res = await getStats.mutateAsync(payload);
    if (res.data) {
      setStats(res.data);
    }
  };

  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary">
        <div className="text-[32px] font-bold">Статистика</div>
        <p className="text-textSecondary text-base">
          Аналитика и статистика по автомобилям
        </p>
      </div>

      {/* Date Filters */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">
              Дата начала
            </label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-2">
              Дата окончания
            </label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleFetchStats}
              disabled={getStats.isPending}
              className="bg-[#88ba00] hover:bg-[#7aa800] text-white"
            >
              {getStats.isPending ? "Загрузка..." : "Применить"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
            >
              Сбросить
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Display */}
      <div className="mt-8">
        {getStats.isPending ? (
          <div className="text-center py-12">
            <p className="text-textSecondary">Загрузка статистики...</p>
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(stats).map(([key, value]) => (
              <Card key={key} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-textSecondary capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {typeof value === 'number' ? value.toLocaleString() : String(value)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-textSecondary">Нет данных для отображения</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;