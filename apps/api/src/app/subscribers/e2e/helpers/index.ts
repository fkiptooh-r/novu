import { UserSession } from '@novu/testing';
import { IUpdateNotificationTemplateDto, PreferenceLevelEnum } from '@novu/shared';
import axios from 'axios';

import { UpdateSubscriberOnlineFlagRequestDto } from '../../dtos/update-subscriber-online-flag-request.dto';
import { UpdateSubscriberPreferenceRequestDto } from '../../../widgets/dtos/update-subscriber-preference-request.dto';
import { UpdateSubscriberGlobalPreferencesRequestDto } from '../../dtos/update-subscriber-global-preferences-request.dto';

const axiosInstance = axios.create();

export async function getNotificationTemplate(session: UserSession, id: string) {
  return await axiosInstance.get(`${session.serverUrl}/v1/workflows/${id}`, {
    headers: {
      authorization: `ApiKey ${session.apiKey}`,
    },
  });
}

export async function updateNotificationTemplate(
  session: UserSession,
  id: string,
  data: IUpdateNotificationTemplateDto
) {
  return await axiosInstance.put(`${session.serverUrl}/v1/workflows/${id}`, data, {
    headers: {
      authorization: `ApiKey ${session.apiKey}`,
    },
  });
}

export async function getPreference(
  session: UserSession,
  subscriberId = session.subscriberId,
  queryParams: { includeInactiveChannels?: boolean } = {}
) {
  const url = new URL(`${session.serverUrl}/v1/subscribers/${subscriberId}/preferences`);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return await axiosInstance.get(url.toString(), {
    headers: {
      authorization: `ApiKey ${session.apiKey}`,
    },
  });
}

export async function getPreferenceByLevel(
  session: UserSession,
  subscriberId = session.subscriberId,
  level: PreferenceLevelEnum,
  queryParams: { includeInactiveChannels?: boolean } = {}
) {
  const url = new URL(`${session.serverUrl}/v1/subscribers/${subscriberId}/preferences/${level}`);
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return await axiosInstance.get(url.toString(), {
    headers: {
      authorization: `ApiKey ${session.apiKey}`,
    },
  });
}

export async function updateSubscriberOnlineFlag(
  data: UpdateSubscriberOnlineFlagRequestDto,
  session: UserSession,
  subscriberId: string
) {
  return await axiosInstance.patch(`${session.serverUrl}/v1/subscribers/${subscriberId}/online-status`, data, {
    headers: {
      authorization: `ApiKey ${session.apiKey}`,
    },
  });
}

export async function updatePreference(
  data: UpdateSubscriberPreferenceRequestDto,
  session: UserSession,
  templateId: string
) {
  return await axiosInstance.patch(
    `${session.serverUrl}/v1/subscribers/${session.subscriberId}/preferences/${templateId}`,
    data,
    {
      headers: {
        authorization: `ApiKey ${session.apiKey}`,
      },
    }
  );
}

export async function updatePreferences(data: UpdateSubscriberPreferenceRequestDto, session: UserSession) {
  return await axiosInstance.patch(`${session.serverUrl}/v1/subscribers/${session.subscriberId}/preferences`, data, {
    headers: {
      authorization: `ApiKey ${session.apiKey}`,
    },
  });
}

export async function updateGlobalPreferences(data: UpdateSubscriberGlobalPreferencesRequestDto, session: UserSession) {
  return await axiosInstance.patch(`${session.serverUrl}/v1/subscribers/${session.subscriberId}/preferences`, data, {
    headers: {
      authorization: `ApiKey ${session.apiKey}`,
    },
  });
}
