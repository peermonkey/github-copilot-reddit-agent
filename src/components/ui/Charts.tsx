import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { Card } from './Card'

interface DataPoint {
  name: string
  value: number
  timestamp?: string
}

interface ChartProps {
  data: DataPoint[]
  height?: number
  color?: string
  gradient?: boolean
}

export const FuturisticLineChart: React.FC<ChartProps> = ({ 
  data, 
  height = 200, 
  color = '#00ff88',
  gradient = true 
}) => {
  return (
    <div className="relative">
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent rounded-lg" />
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8892b0', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8892b0', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(16, 24, 40, 0.9)',
              border: '1px solid #30363d',
              borderRadius: '8px',
              color: '#c9d1d9'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color}
            strokeWidth={2}
            fill="url(#lineGradient)"
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const FuturisticBarChart: React.FC<ChartProps> = ({ 
  data, 
  height = 200, 
  color = '#ff6b6b' 
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.3}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#8892b0', fontSize: 12 }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#8892b0', fontSize: 12 }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(16, 24, 40, 0.9)',
            border: '1px solid #30363d',
            borderRadius: '8px',
            color: '#c9d1d9'
          }}
        />
        <Bar 
          dataKey="value" 
          fill="url(#barGradient)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

interface PieChartData {
  name: string
  value: number
  color: string
}

interface PieChartProps {
  data: PieChartData[]
  height?: number
}

export const FuturisticPieChart: React.FC<PieChartProps> = ({ 
  data, 
  height = 200 
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'rgba(16, 24, 40, 0.9)',
            border: '1px solid #30363d',
            borderRadius: '8px',
            color: '#c9d1d9'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  color?: string
  trend?: 'up' | 'down' | 'neutral'
}

export const FuturisticMetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color = '#00ff88',
  trend = 'neutral'
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-30" />
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20`, color }}>
                {icon}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</p>
              <p className="text-2xl font-bold text-white" style={{ color }}>{value}</p>
            </div>
          </div>
          {change !== undefined && (
            <div className={`text-sm font-medium ${getTrendColor()}`}>
              {change > 0 ? '+' : ''}{change}%
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

interface RealTimeIndicatorProps {
  status: 'online' | 'offline' | 'warning'
  label: string
  lastUpdate?: Date
}

export const RealTimeIndicator: React.FC<RealTimeIndicatorProps> = ({ 
  status, 
  label, 
  lastUpdate 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-400'
      case 'warning': return 'bg-yellow-400'
      case 'offline': return 'bg-red-400'
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
        {status === 'online' && (
          <div className={`absolute inset-0 w-3 h-3 rounded-full ${getStatusColor()} animate-ping opacity-75`} />
        )}
      </div>
      <span className="text-sm text-gray-300">{label}</span>
      {lastUpdate && (
        <span className="text-xs text-gray-500">
          {lastUpdate.toLocaleTimeString()}
        </span>
      )}
    </div>
  )
}

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = '#00ff88',
  label 
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - progress / 100 * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          className="text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-300 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{Math.round(progress)}%</div>
          {label && <div className="text-xs text-gray-400">{label}</div>}
        </div>
      </div>
    </div>
  )
}