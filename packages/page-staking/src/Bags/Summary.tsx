// Copyright 2017-2022 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { BagMap } from './types';

import React, { useMemo } from 'react';

import { CardSummary, Spinner, SummaryBox } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import { formatNumber, isNumber } from '@polkadot/util';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  ids?: BN[];
  mapOwn?: BagMap;
}

function Summary ({ className = '', ids, mapOwn }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const total = useCall<BN>(api.query.bagsList.counterForListNodes);

  const myCount = useMemo(
    () => mapOwn && Object.values(mapOwn).reduce((count, n) => count + n.length, 0),
    [mapOwn]
  );

  return (
    <SummaryBox className={className}>
      <CardSummary label={t<string>('total bags')}>
        {ids
          ? formatNumber(ids.length)
          : <Spinner noLabel />
        }
      </CardSummary>
      <section>
        <CardSummary label={t<string>('total nodes')}>
          {mapOwn
            ? formatNumber(total)
            : <Spinner noLabel />
          }
        </CardSummary>
        <CardSummary label={t<string>('my nodes')}>
          {isNumber(myCount)
            ? formatNumber(myCount)
            : '-'
          }
        </CardSummary>
      </section>
    </SummaryBox>
  );
}

export default React.memo(Summary);
