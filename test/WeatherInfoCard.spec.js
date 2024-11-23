import WeatherInfoCard from '@/components/WeatherInfoCard.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('WeatherInfoCard Component', () => {
  it('renders default message when no city is provided', () => {
    const wrapper = mount(WeatherInfoCard, {
      props: {
        city: null,
      },
    });

    // Verifica que el texto por defecto se renderice
    expect(wrapper.text()).toContain('Please search for a city to view weather information.');
    // Verifica que el icono CloudOutlined esté presente
    expect(wrapper.find('.anticon-cloud').exists()).toBe(true);
  });
});

// Simula el comportamiento del composable `useWeather`
vi.mock('@/composables/useWeather', () => ({
  useWeather: vi.fn().mockResolvedValue({
    data: {
      temperature: 25,
      humidity: 60,
      description: 'Clear sky',
    },
    error: null,
  }),
}));

describe('WeatherInfoCard Component', () => {
  it('displays weather information when data is available', async () => {
    const city = { id: 123, name: 'Amsterdam' };
    const wrapper = mount(WeatherInfoCard, {
      props: {
        city,
      },
    });

    // Espera a que se resuelva la promesa del composable
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verifica que los datos climáticos se muestren correctamente
    expect(wrapper.text()).toContain('Weather in Amsterdam');
    expect(wrapper.text()).toContain('Temperature: 25°C');
    expect(wrapper.text()).toContain('Humidity: 60%');
    expect(wrapper.text()).toContain('Description: Clear sky');
  });
});
